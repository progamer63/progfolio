function fetchinfo() {
    let user = 'progamer63';
    let url = 'https://lastfm-last-played.biancarosa.com.br/' + user + '/latest-song';
    let song = document.querySelector('#song');
    let artist = document.querySelector('#artist');
    let album = document.querySelector('#album');
    let tag = document.querySelector('#tag');
    let maxlen = 54;
    fetch(url)
    .then(function (response) {
        return response.json();
    }).then(function (json) {
        if ('@attr' in json['track']) {
            tag.innerHTML = "now listening to:";
        } else {
            tag.innerHTML = "last listened to:";
        }
        album.innerHTML = json['track']['album']['#text'];
        document.documentElement.style.setProperty("--album-length", album.innerHTML.length);
        song.innerHTML = json['track']['name'];
        if (song.innerHTML.length >= maxlen) {
            song.innerHTML = song.innerHTML.substring(0, maxlen);
            song.innerHTML = song.innerHTML+'...';
        }
        document.documentElement.style.setProperty("--title-length", song.innerHTML.length);
        artist.innerHTML = json['track']['artist']['#text'];
    });
}
fetchinfo();
setInterval(fetchinfo, 5000);