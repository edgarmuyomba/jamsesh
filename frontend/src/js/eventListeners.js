import { songListInstance } from "./script.js";
import musicPlayer from "./musicPlayer.js";
import UI from "./ui.js";
import websocketHandler from "./websocketHandler.js";

export function EventListeners() {

    const ui = UI()

    const addSongToPlaylist = (event) => {
        const button = event.currentTarget;

        let id = parseInt(button.dataset.id);
        let song = songListInstance.getSongById(id);
        if (song) {
            const event = {
                type: 'add',
                id: id
            };

            // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>

            websocketHandler.sendMessage(event);
        }
    }

    const removeSongFromPlaylist = (event) => {
        const button = event.currentTarget;

        let id = parseInt(button.dataset.id);
        let song = songListInstance.getSongById(id);
        if (song) {
            const event = {
                type: 'remove',
                id: id
            }

            websocketHandler.sendMessage(event);
        }
    }

    const playPauseSong = () => {
        musicPlayer.playPauseSong()
        ui.updatePlayPauseSong(musicPlayer.isPlaying)
    }

    const nextSong = () => {
        musicPlayer.nextSong()
    }

    const displayPlaylist = () => {
        ui.toggleDisplay(true);
    }

    const displaySongs = () => {
        ui.toggleDisplay(false);
    }

    return {
        addSongToPlaylist,
        removeSongFromPlaylist,
        playPauseSong,
        nextSong,
        displayPlaylist,
        displaySongs
    }
}
