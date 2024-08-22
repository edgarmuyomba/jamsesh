import UI from './ui.js';

export default function Playlist() {
    var songs = [];

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

    return {
        songs,
        addSongs,
        addSong,
        removeSong
    }

}