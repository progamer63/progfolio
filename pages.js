function navigate(page) {
    document.getElementById('about').innerHTML = pages[page];
    history.pushState({page}, '', '/' + page);
}

const pages = {
    home: `welcome to my website! it's mostly a site to do fun things with, but i also have
    a photography portfolio here.<br class="spacer">
    currently, i have an interest in homelabbing. check the homelab page on the side to see more about it!<br>
    i also listen to a lot of music. check the music page for more.`,
    greets: `greets to:<br>
    <a href="https://x.com/LeaFrostfern">@leafrostfern</a> - made pfp<br>
    <a href="https://spoopinatural.art">@spoopinatural</a> - made background<br class="spacer">
    friends:<br>
    <a href="https://zai-tm.ca/">zai-tm</a><br>
    <a href="https://kittycob.dev/">kittycob</a><br>
    <a href="https://osh.dev/">osh</a><br>`,
    lab: `i got into homelabbing at the very start of 2026. i have a 12u 10inch rack with 3 raspberry pi 5s, a 2u screen, an HP 1L mini pc, and 2x 6tb hdds.
    in the future, it'll have a proper ubiquiti network setup to replace the unmanaged switch into unmanaged switch situation i have atm.
    <br class="spacer">the mini pc runs proxmox, and hosts various services. of note are jellyfin, gitea, netdata, navidrome, slskd, and home assistant.`,
    music: `boy oh boy do i listen to a lot of music. just take a look at <a href="https://www.last.fm/user/progamer63">last.fm</a>. or better yet, support listenbrainz
    and look at me <a href="https://listenbrainz.org/user/progdotgay/">there</a>.<br class="spacer">
    some artists of note, in no order at all, and absolutely not an exhaustive list, are:<br>
    aphex twin, girl talk, king gizzard & the lizard wizard, boards of canada, green day, daft punk, fatboy slim, masayoshi takanaka, foo fighters, heaven pierce her, queens of the stone age,
    kyuss, motorhead, nine inch nails, the prodigy, romanceplanet, primus, les claypool, system of a down, weezer, talking heads, skrillex, ramones, pink floyd, pearl jam, oingo boingo,
    led zeppelin, nirvana, metallica, LFO<br class="spacer">
    as you can tell i could list probably 50 more but thats enough to get the point across that i listen to almost anything.`,
    photos: ``,
    games:`i play video games yes i do that<br class="spacer">
    some i play: ultrakill, sledding game, flock around, beamng.drive, minecraft, mini motorways, upload labs, bloons td6, balatro, trackmania,
    skate 3`,
    old: `there is a need to keep some old stuff from my legacy site on here. in case you are trying to access any of these, they still exist a little.<br class="spacer">
    these pages are based on an old codebase, so the visual style will be very much different. i might update them one day,
    but for now they exist like this.`
}

function navigate(page) {
    document.getElementById('about').innerHTML = pages[page];
}