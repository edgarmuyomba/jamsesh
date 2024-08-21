import { websocket } from "./script.js"
import { songListInstance } from "./script.js";

export function EventListeners() {

    const addSongToPlaylist = (event) => {
        const button = event.currentTarget;
        
        let id = parseInt(button.dataset.id);
        let song = songListInstance.getSongById(id);
        if (song) {
            const event = {
                type: 'add',
                id: id
            };
            
            websocket.send(JSON.stringify(event));
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

            websocket.send(JSON.stringify(event))
        }
    }

    return {
        addSongToPlaylist,
        removeSongFromPlaylist
    }
}
