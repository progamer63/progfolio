(function () {
    // ---------- tuning ----------
    const SCROLL_STEP = 80;     // px of scroll per photo. smaller = faster, bigger = slower
    const SHIFT_JUMP = 5;       // photos skipped with shift + arrow key
    const SLIDE_MS = 300;       // how long the strip takes to slide to a photo
    const EASE = 'cubic-bezier(0.22, 0.8, 0.3, 1)';  // fast start, soft landing
    const FADE_MS = 250;        // open/close fade (keep in sync with #lightbox transition in css)
    const INFO_DELAY = 120;     // ms to wait after the strip stops before reading exif (keeps scrubbing smooth)

    // exif tags we ask exifr for (everything else is ignored)
    const EXIF_TAGS = ['Make', 'Model', 'FNumber', 'ExposureTime', 'ISO',
                       'FocalLength', 'XResolution', 'YResolution', 'ResolutionUnit'];

    // ---------- state ----------
    let photos = [];
    let index = 0;
    let wheelAcc = 0;
    let wheelReset;
    let closeTimer;
    let infoTimer;
    const infoCache = new Map();   // photo url -> formatted info text

    let showInfo = true;
    try { showInfo = localStorage.getItem('lb-info') !== 'off'; } catch (e) {}

    // ---------- build overlay ----------
    const box = document.createElement('div');
    box.id = 'lightbox';
    box.innerHTML = `
        <button id="lb-close" aria-label="close">✕</button>
        <button id="lb-prev" aria-label="previous">‹</button>
        <div id="lb-strip"></div>
        <button id="lb-next" aria-label="next">›</button>
        <div id="lb-count"></div>
        <div id="lb-info"></div>`;

    function mount() { document.body.appendChild(box); }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount);
    } else {
        mount();
    }

    const strip = () => box.querySelector('#lb-strip');
    const isOpen = () => box.classList.contains('open');

    // ---------- exif ----------
    // dpi from XResolution, converting if the file stores pixels per cm
    function dpiOf(t) {
        const x = Array.isArray(t.XResolution) ? t.XResolution[0] : t.XResolution;
        if (!x) return null;
        const u = t.ResolutionUnit;
        if (u === 3 || u === 'cm') return Math.round(x * 2.54);
        if (u === 1 || u === 'None') return null;       // "no unit", meaningless
        return Math.round(x);                            // inches (the default)
    }

    // "Canon" + "Canon EOS Rebel T8i" -> "Canon EOS Rebel T8i" (no repeated maker)
    function cameraOf(t) {
        const make = (t.Make || '').trim();
        const model = (t.Model || '').trim();
        if (!model) return make;
        if (!make) return model;
        const firstWord = make.toLowerCase().split(' ')[0];
        return model.toLowerCase().startsWith(firstWord) ? model : make + ' ' + model;
    }

    function shutterOf(sec) {
        if (!sec) return null;
        if (sec < 0.4) return '1/' + Math.round(1 / sec) + 's';
        return (+sec.toFixed(1)) + 's';
    }

    function formatInfo(w, h, t) {
        const parts = [];
        if (w && h) parts.push(w + ' × ' + h + ' px');

        const dpi = dpiOf(t);
        if (dpi) parts.push(dpi + ' dpi');

        const cam = cameraOf(t);
        if (cam) parts.push(cam);

        if (t.FocalLength) parts.push((+t.FocalLength.toFixed(1)) + 'mm');
        if (t.FNumber) parts.push('f/' + (+t.FNumber.toFixed(1)));
        const shutter = shutterOf(t.ExposureTime);
        if (shutter) parts.push(shutter);
        const iso = Array.isArray(t.ISO) ? t.ISO[0] : t.ISO;
        if (iso) parts.push('ISO ' + iso);

        return parts.join('  ·  ');
    }

    async function readInfo(im) {
        const url = im.currentSrc || im.src;
        if (infoCache.has(url)) return infoCache.get(url);

        // make sure the image has loaded so naturalWidth/Height are real
        if (im.decode) await im.decode().catch(() => {});

        let tags = {};
        if (typeof exifr !== 'undefined') {
            try { tags = (await exifr.parse(url, EXIF_TAGS)) || {}; } catch (e) {}
        }
        const text = formatInfo(im.naturalWidth, im.naturalHeight, tags);
        infoCache.set(url, text);
        return text;
    }

    function updateInfo() {
        const el = box.querySelector('#lb-info');
        el.classList.remove('show');           // hide the old text right away
        clearTimeout(infoTimer);
        if (!showInfo) return;

        const mine = index;
        infoTimer = setTimeout(async () => {
            if (!isOpen()) return;
            const slide = strip().children[mine];
            const im = slide && slide.querySelector('img');
            if (!im) return;
            const text = await readInfo(im);
            if (index !== mine || !isOpen()) return;   // user moved on while we were reading
            el.textContent = text;
            el.classList.toggle('show', !!text);
        }, INFO_DELAY);
    }

    function setInfoVisible(on) {
        showInfo = on;
        try { localStorage.setItem('lb-info', on ? 'on' : 'off'); } catch (e) {}
        updateInfo();
    }

    // ---------- core ----------
    function build() {
        // one slide per photo, all real <img> elements so the browser
        // loads and decodes them up front instead of on demand
        const s = strip();
        s.innerHTML = '';
        photos.forEach((p) => {
            const slide = document.createElement('div');
            slide.className = 'lb-slide';
            const im = document.createElement('img');
            im.decoding = 'async';
            im.alt = '';
            im.draggable = false;
            im.src = p.currentSrc || p.src;
            slide.appendChild(im);
            s.appendChild(slide);
        });
    }

    function go(i, animate = true) {
        // clamp at the ends (no wrap, so the strip never rewinds through everything)
        index = Math.max(0, Math.min(photos.length - 1, i));
        const s = strip();
        s.style.transition = animate ? `transform ${SLIDE_MS}ms ${EASE}` : 'none';
        s.style.transform = `translate3d(${-index * 100}vw, 0, 0)`;

        // the centered photo is "active" (full opacity), the rest are dimmed.
        // css transitions the opacity, so photos fade in as they arrive
        // and fade out as they leave
        [...s.children].forEach((slide, n) => {
            slide.classList.toggle('active', n === index);
        });

        box.querySelector('#lb-count').textContent = (index + 1) + ' / ' + photos.length;
        box.querySelector('#lb-prev').style.visibility = index === 0 ? 'hidden' : 'visible';
        box.querySelector('#lb-next').style.visibility = index === photos.length - 1 ? 'hidden' : 'visible';

        updateInfo();
    }

    window.openLightbox = function (i = 0) {
        photos = [...document.querySelectorAll('#photogrid img')];
        if (!photos.length) return;
        clearTimeout(closeTimer);   // cancel a pending cleanup if reopened mid-fade
        build();
        go(i, false);               // jump straight to the clicked photo, no slide
        // wait a frame so the fade-in transition actually runs
        requestAnimationFrame(() => box.classList.add('open'));
    };

    function close() {
        box.classList.remove('open');   // starts the fade-out
        wheelAcc = 0;
        clearTimeout(infoTimer);
        // free the image elements only after the fade finishes
        closeTimer = setTimeout(() => { strip().innerHTML = ''; }, FADE_MS);
    }

    // ---------- open by clicking a photo (works for injected content) ----------
    document.addEventListener('click', (e) => {
        const t = e.target;
        if (t.matches && t.matches('#photogrid img')) {
            const all = [...document.querySelectorAll('#photogrid img')];
            openLightbox(all.indexOf(t));
        }
    });

    // ---------- buttons + backdrop click ----------
    box.addEventListener('click', (e) => {
        if (e.target.id === 'lb-next') go(index + 1);
        else if (e.target.id === 'lb-prev') go(index - 1);
        else if (e.target.id === 'lb-close') close();
        else if (e.target === box || e.target.classList.contains('lb-slide')) close();
    });

    // ---------- keyboard ----------
    document.addEventListener('keydown', (e) => {
        if (!isOpen()) return;
        const step = e.shiftKey ? SHIFT_JUMP : 1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(index + step); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(index - step); }
        else if (e.key === 'Home') go(0);
        else if (e.key === 'End') go(photos.length - 1);
        else if (e.key === 'i' || e.key === 'I') setInfoVisible(!showInfo);
        else if (e.key === 'Escape') close();
    });

    // ---------- scroll wheel / trackpad ----------
    // accumulates scroll distance: each SCROLL_STEP px moves one photo.
    // every step re-aims the strip, so a fast scroll looks like scrubbing
    // through an album instead of teleporting
    box.addEventListener('wheel', (e) => {
        e.preventDefault();

        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 33;   // some browsers report lines, not pixels

        wheelAcc += delta;
        const steps = Math.trunc(wheelAcc / SCROLL_STEP);
        if (steps !== 0) {
            wheelAcc -= steps * SCROLL_STEP;
            go(index + steps);
        }

        clearTimeout(wheelReset);
        wheelReset = setTimeout(() => { wheelAcc = 0; }, 150);
    }, { passive: false });

    // ---------- touch swipe ----------
    let startX = 0;
    box.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    box.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
    });

    // ---------- copy protection (casual deterrent only) ----------
    box.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (typeof disableRightClick === 'function') disableRightClick();
    });

    document.addEventListener('dragstart', (e) => {
        if (e.target.matches && e.target.matches('#photogrid img, #lb-strip img')) e.preventDefault();
    });
})();