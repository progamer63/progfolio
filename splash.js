const splashes = ['brand new!', 'recently changed!', 'exciting phrase!', 
    'new and exciting!', 'handmade!', 'javascript inside!', '400 lines of css!', 
    'correct horse battery staple!', 'DROP TABLE USERS;--', 'it was dns.', 'ipv6 who?', 
    'might be sentient!', 'made of sand!', 'hamster powered!', 'at DEFCON again!', '18:07 mcsr pb btw', 'jarona!',
    'updated past midnight!', 'uses arch btw', 'hamburger']

function newSplash() {
    const splash = document.querySelector('#splash');
    let int = Math.floor(Math.random() * splashes.length);
    let choice = splashes[int];
    splash.innerHTML = choice;
}