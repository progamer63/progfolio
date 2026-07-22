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
    home: `welcome to my website! it's mostly a site to do fun things with, but i also have
    a photography portfolio here.<br class="spacer">
    currently, i have an interest in homelabbing. check the homelab page on the side to see more about it!<br class="spacer">
    i listen to a lot of music. i also have a large vinyl and cd collection. check the music page for more.`,
    greets: `greets to:<br>
    <a target="_blank" rel="noopener noreferrer" href="https://x.com/LeaFrostfern">@leafrostfern</a> - made pfp<br>
    <a target="_blank" rel="noopener noreferrer" href="https://spoopinatural.art">@spoopinatural</a> - made background<br class="spacer">
    friend sites:<br>
    <a target="_blank" rel="noopener noreferrer" href="https://zai-tm.ca/">zai-tm</a><br>
    <a target="_blank" rel="noopener noreferrer" href="https://kittycob.dev/">kittycob</a><br>
    <a target="_blank" rel="noopener noreferrer" href="https://osh.dev/">osh</a><br>`,
    lab: `i got into homelabbing at the very start of 2026. i have a 12u 10inch rack with 3 raspberry pi 5s, a 2u screen, an HP 1L mini pc, and 2x 6tb hdds.
    in the future, it'll have a proper ubiquiti network setup to replace the unmanaged switch into unmanaged switch situation i have atm.<br class="spacer">
    the mini pc runs proxmox, and hosts various services. of note are jellyfin, gitea, netdata, navidrome, slskd, and home assistant.<br class="spacer">
    i added an epaper display to my wall, then moved it to my desk. it has my google calendar on it for events, meetings, and homework.<br>
    it also has a weather forecast, outdoor and indoor temperatures, and lastfm scrobble information. really fun to learn how to use esphome.`,
    music: `boy oh boy do i listen to a lot of music. just take a look at <a target="_blank" rel="noopener noreferrer" href="https://www.last.fm/user/progamer63">last.fm</a>. or better yet, support listenbrainz
    and look at me <a target="_blank" rel="noopener noreferrer" href="https://listenbrainz.org/user/progdotgay/">there</a>.<br class="spacer">
    some artists of note, in no order at all, and absolutely not an exhaustive list, are:<br>
    aphex twin, girl talk, king gizzard & the lizard wizard, boards of canada, underworld, green day, daft punk, fatboy slim, les claypool, masayoshi takanaka, foo fighters, heaven pierce her, queens of the stone age,
    kyuss, motorhead, nine inch nails, the prodigy, romanceplanet, primus, depeche mode, system of a down, weezer, talking heads, skrillex, ramones, pink floyd, pearl jam, oingo boingo,
    led zeppelin, nirvana, metallica, LFO<br class="spacer">
    it's insane how boards of canada released a new album since i redid my website. holy shit. aoty. i was able to go to the listening session in los angeles on a whim. actually was peak.<br class="spacer">
    as you can tell i could list probably 50 more but thats enough to get the point across that i listen to almost anything.<br class="spacer">
    i collect vinyl, cds, and recently some dvds. check my <a target="_blank" rel="noopener noreferrer" href="https://www.discogs.com/user/progamer63/collection">discogs</a>!`,
    games:`i play video games yes i do that<br class="spacer">
    some i play: ultrakill, sledding game, flock around, beamng.drive, minecraft, mini motorways, upload labs, bloons td6, balatro, trackmania,
    skate 3, deltarune<br class="spacer">
    i did recently get a steam deck, and that's really changed how i play games. i find myself enjoying what i play more on deck than on my pc. it's really nice to have a do everything device like that.<br>
    it's loaded with emulators and roms, and around 50 games from my steam library. it's great for killing time while out waiting, or for relaxing anywhere i want to.<br class="spacer">
    i might get the steam controller. can't really justify $100 on a controller i might not like. i want the trackpads, but idk.<br>
    i infact did buy the steam controller. it's peak. got the purchase email, bought it within minutes. have used it a good amount every day.<br class="spacer">
    i played deltarune chapters 1-4 in the 4 days leading up to chapter 5. played chapter 5 the moment it came out. what a fucking game.<br class="spacer">
    i got into mcsr ranked recently. laugh at my runs <a target="_blank" rel="noopener noreferrer" href="https://mcsrranked.com/stats/crui?matches=private">here</a>`,
    old: `there is a need to keep some old stuff from my legacy site on here. in case you are trying to access any of these, they still exist a little.<br class="spacer">
    these pages are based on an old codebase, so the visual style will be very much different. i might update them one day,
    but for now they exist like this.`,
    photos: `
    occasionally, i do some photography. usually, i just have my phone. however, i do have a canon t8i with the stock kit lens. i also have a 300mm something lens for it.<br>
    i don't take photos that often anymore, a lot of what i have are from a photography class i took a few years ago.
    <br class=spacer>
    <div id="photogrid" oncontextmenu="return disableRightClick();">
    <div class="photo"><img class="photo" src="files/takanaka1.jpg"></div>
    <div class="photo"><img class="photo" src="files/takanaka2.jpg"></div>
    <div class="photo"><img src="files/1467ecomp.jpg"></div>
    <div class="photo"><img src="files/1430comp.jpg"></div>
    <div class="photo"><img src="files/1405ecomp.jpg"></div>
    <div class="photo"><img src="files/1414comp.jpg"></div>
    <div class="photo"><img src="files/1227comp.jpg"></div>
    <div class="photo"><img src="files/borededitcomp.jpg"></div>
    <div class="photo"><img src="files/13comp.jpg"></div>
    <div class="photo"><img src="files/0994comp.jpg"></div>
    <div class="photo"><img src="files/3comp.jpg"></div>
    </div>`,
    changes:`
    <h2 id="changes">
        7/21/2026:
        <ul>
            <li>actual widget now!</li>
            <li>added a scroll indicator</li>
            <li>add more about my homelab</li>
            <li>added more to the music page</li>
            <li>add mcsr info to games</li>
            <li>more splashes</li>
        </ul>
        5/3/2026:
        <ul>
            <li>move logo next to title</li>
            <li>move changes to own page</li>
            <li>adjusted sizing in general</li>
            <li>try to fix on 1080p, classic 4k monitor issue</li>
            <li>second attempts to work on vertical devices, short devices, etc</li>
        </ul>
        5/2/2026:
        <ul>
            <li>+ more splashes</li>
            <li>- albumcovers (for now)</li>
        </ul>
        5/1/2026:
        <ul>
            <li>new codebase!</li>
            <li>everything is new!</li>
        </ul>
    </h2>`
}