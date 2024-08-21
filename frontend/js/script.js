import Playlist from './playlist.js'
import SongList from './songList.js'
 
export const websocket = new WebSocket('ws://127.0.0.1:8001/');

export const playlistInstance = Playlist();

export const songListInstance = SongList();

websocket.onopen = () => {
    const event = {
        type: 'connect'
    }
    websocket.send(JSON.stringify(event))
}


websocket.onmessage = ({ data }) => {
    const event = JSON.parse(data);

    switch(event.type) {
        case 'connect':
            // load the playlist and songs
            playlistInstance.addSongs(event.playlist)
            songListInstance.addSongs(event.songs)
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