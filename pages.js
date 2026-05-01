function navigate(page) {
    const about = document.getElementById('about');
    about.classList.add('switching');
    
    setTimeout(() => {
        about.innerHTML = pages[page];
    }, 250);

    about.addEventListener('animationend', () => {
        about.classList.remove('switching');
    }, { once: true });

}

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
    in the future, it'll have a proper ubiquiti network setup to replace the unmanaged switch into unmanaged switch situation i have atm.
    <br class="spacer">the mini pc runs proxmox, and hosts various services. of note are jellyfin, gitea, netdata, navidrome, slskd, and home assistant.`,
    music: `boy oh boy do i listen to a lot of music. just take a look at <a target="_blank" rel="noopener noreferrer" href="https://www.last.fm/user/progamer63">last.fm</a>. or better yet, support listenbrainz
    and look at me <a target="_blank" rel="noopener noreferrer" href="https://listenbrainz.org/user/progdotgay/">there</a>.<br class="spacer">
    some artists of note, in no order at all, and absolutely not an exhaustive list, are:<br>
    aphex twin, girl talk, king gizzard & the lizard wizard, boards of canada, green day, daft punk, fatboy slim, les claypool, masayoshi takanaka, foo fighters, heaven pierce her, queens of the stone age,
    kyuss, motorhead, nine inch nails, the prodigy, romanceplanet, primus, depeche mode, system of a down, weezer, talking heads, skrillex, ramones, pink floyd, pearl jam, oingo boingo,
    led zeppelin, nirvana, metallica, LFO<br class="spacer">
    as you can tell i could list probably 50 more but thats enough to get the point across that i listen to almost anything.<br class="spacer">
    i collect vinyl, cds, and recently some dvds. check my <a target="_blank" rel="noopener noreferrer" href="https://www.discogs.com/user/progamer63/collection">discogs</a>!`,
    games:`i play video games yes i do that<br class="spacer">
    some i play: ultrakill, sledding game, flock around, beamng.drive, minecraft, mini motorways, upload labs, bloons td6, balatro, trackmania,
    skate 3`,
    old: `there is a need to keep some old stuff from my legacy site on here. in case you are trying to access any of these, they still exist a little.<br class="spacer">
    these pages are based on an old codebase, so the visual style will be very much different. i might update them one day,
    but for now they exist like this.`,
    photos: `
    occasionally, i do some photography. i have a canon t8i with the stock kit lens.<br>
    i also have a 300mm something lens for it. i don't take photos that often anymore, a lot of what i have are from a photography class i took a few years ago.
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
    </div>`
}