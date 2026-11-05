const splashes = ['brand new!', 'recently changed!', 'exciting phrase!', 
    'new and exciting!', 'handmade!', 'javascript inside!', '600 lines of css!', 
    'correct horse battery staple!', 'DROP TABLE USERS;--', 'it was dns.', 'ipv6 who?', 
    'might be sentient!', 'made of sand!', 'hamster powered!', 'at DEFCON again!', '16:14 mcsr pb btw', 'jarona!',
    'updated past midnight!', 'uses arch btw', 'hamburger', 'got killed by geese', 'does not use 4 as a private key!',
    'check out reskate!', 'not affected by the ram shortage!', 'thanks sam altman.']

function newSplash() {
    const splash = document.querySelector('#splash');
    let int = Math.floor(Math.random() * splashes.length);
    let choice = splashes[int];
    splash.innerHTML = choice;
}