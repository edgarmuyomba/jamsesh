import UI from './ui.js';

export default function Playlist() {
    var songs = [];

    var currentSong = songs[0];

    const ui = UI();

    const addSongs = (newSongs) => {
        newSongs.forEach(song =>
            addSong(song)
        );
    }

    const addSong = (song) => {
        songs.push(song);
        ui.addToPlaylist(song);
    }

    const removeSong = (song) => {
        let index = songs.indexOf(song)
        if (index > -1) {
            songs.splice(index, 1);
        }
        ui.removeFromPlaylist(song);
    }

    const playNextSong = () => {
        if (songs.length > 0) {
            var song = songs.shift();
            currentSong = songs[0];
            ui.removeFromSongs(song);
        }
    }

    return {
        songs,
        currentSong,
        playNextSong,
        addSongs,
        addSong,
        removeSong
    }

}