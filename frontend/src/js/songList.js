import UI from './ui.js';

export default function SongList() {
    var songs = [];

    const ui = UI();

    const addSongs = (newSongs) => {
        newSongs.forEach((song) =>
            addSong(song)
        );
    }

    const addSong = (song) => {
        songs.push(song);
        ui.addToSongs(song);
    }

    const getSongById = (id) => {
        for (var song of songs) {
            if (song.id === id) {
                return song;
            }
        }
        return null;
    }

    return {
        songs,
        addSongs,
        getSongById
    }
}