const splashes = ['handmade!', 'javascript inside!', '400 lines of css!', 
    'correct horse battery staple!', 'DROP TABLE USERS;--', 'it was dns.', 'ipv6 who?', 
    'might be sentient!', 'made of sand!', 'hamster powered!', 'at DEFCON again!',
    'updated past midnight!', 'uses arch btw', 'unique DEFCON page!']

function newSplash() {
    const splash = document.querySelector('#splash');
    let int = Math.floor(Math.random() * splashes.length);
    let choice = splashes[int];
    splash.innerHTML = choice;
}