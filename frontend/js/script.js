import Playlist from './playlist.js'
import SongList from './songList.js'
import musicPlayer from './musicPlayer.js';
import { EventListeners } from './eventListeners.js';
import websocket from './websocketHandler.js';
import UI from './ui.js';


export const playlistInstance = Playlist();

export const songListInstance = SongList();

const eventListeners = EventListeners();
window.eventListeners = eventListeners;

const ui = UI();


const handler = ({ data }) => {
    const event = JSON.parse(data);

    switch (event.type) {
        case 'connect':
            // load the playlist and songs
            playlistInstance.addSongs(event.playlist)
            songListInstance.addSongs(event.songs)
            musicPlayer.setCurrentState(event.state)
            break;
        case 'add':
            // update the playlist
            var song = songListInstance.getSongById(event.song);
            if (song) {
                playlistInstance.addSong(song);
            }
            break;
        case 'remove':
            var song = songListInstance.getSongById(event.song)
            if (song) {
                playlistInstance.removeSong(song)
            }
    }
}

websocket.receiveMessage(handler);