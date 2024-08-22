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

    const playPauseSong = async () => {
        await musicPlayer.playPauseSong()
        ui.updatePlayPauseSong(musicPlayer.isPlaying)
    }

    return {
        addSongToPlaylist,
        removeSongFromPlaylist,
        playPauseSong
    }
}
