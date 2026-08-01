function navigate(page) {
    const about = document.getElementById('about');
    about.classList.add('switching');
    
    setTimeout(() => {
        about.innerHTML = pages[page];
        about.scrollTop = 0;
        updateScrollIndicator();
    }, 250);

    about.addEventListener('animationend', () => {
        about.classList.remove('switching');
    }, { once: true });

}

function updateScrollIndicator() {
    const about = document.getElementById('about');
    const indicator = document.getElementById('scrollIndicator');
    const scrollable = about.scrollHeight > about.clientHeight + 5;
    const atBottom = about.scrollHeight - about.scrollTop - about.clientHeight < 50;
    indicator.classList.toggle('visible', scrollable && !atBottom);
}

document.addEventListener('DOMContentLoaded', () => {
    const about = document.getElementById('about');
    about.addEventListener('scroll', updateScrollIndicator);
    window.addEventListener('resize', updateScrollIndicator);
});

const pages = {
    defcon: `second year at defcon! was able to go to defcon 33. going again to defcon 34 this year. both years, was able to go because of a cybersecurity club
    field trip at my community college. i helped do a lot of the paperwork to be here both years. it's really awesome to be able to take 12 students to defcon to see this side of cybersecurity. the people side. those that actually do the cool stuff.<br class="spacer">
    the nerds and people you talk to here are not the corporate people you learn from in classes. it's also a treat to see this community and be a part of it, to nerd out
    a lot about shared interests. to go to late night meetups. to get lost in the LVCC. stumble into a village you never would have without seeing something interesting.<br class="spacer">
    i made some 3d printed "badges". just a target with an nfc tag in it. it's possible to write over the tag with your android phone,
    or a flipper if you first write it with a phone, then read it with the flipper as a mass write/clone process. idk i just bought the cheapest ones off amazon.
    <br class=spacer>
    <div id="photogrid" oncontextmenu="return disableRightClick();">
        <div class="photo"><img class="photo" src="files/spyvspybadge.jpg"></div>
        <div class="photo"><img class="photo" src="files/dc33haul.jpg"></div>
    </div>`,
    lab: `i got into homelabbing at the very start of 2026. i have a 12u 10inch rack with 3 raspberry pi 5s, a 2u screen, an HP 1L mini pc, and 2x 6tb hdds.
    in the future, it'll have a proper ubiquiti network setup to replace the unmanaged switch into unmanaged switch situation i have atm.<br class="spacer">
    the mini pc runs proxmox, and hosts various services. of note are jellyfin, gitea, netdata, navidrome, slskd, and home assistant.<br class="spacer">
    i added an epaper display to my wall, then moved it to my desk. it has my google calendar on it for events, meetings, and homework.<br>
    it also has a weather forecast, outdoor and indoor temperatures, and lastfm scrobble information. really fun to learn how to use esphome.
    <br class=spacer>
    <div id="photogrid" oncontextmenu="return disableRightClick();">
        <div class="photo"><img class="photo" src="files/homepage.png"></div>
        <div class="photo"><img class="photo" src="files/hatablet.png"></div>
        <div class="photo"><img class="photo" src="files/moving-rack.jpg"></div>
    </div>`,
    warez:`no this isnt for pirated software. go to the proper places for that.<br class="spacer">
    i have lots of random tech. some normal and expected: steam deck, laptop, phone, meshtastic node. some projects: flash modded ipod, raspberry pi router. some odd: spotify car thing w/ custom firmware<br>
    i can't pack an entire mini rack though. the homelab page has more on that, and some photos.
    <br class=spacer>
    <div id="photogrid" oncontextmenu="return disableRightClick();">
        <div class="photo"><img class="photo" src="files/ipod.jpg"></div>
        <div class="photo"><img class="photo" src="files/bocposter.jpg"></div>
    </div>`,
    changes:`
    <h2 id="changes">
        7/31/2026:
        <ul>
            <li>defcon specific version of the site</li>
            <li>has more tech things, some of the other stuff.</li>
        </ul>
    </h2>`
}