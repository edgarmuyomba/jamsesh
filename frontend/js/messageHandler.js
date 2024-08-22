import musicPlayer from "./musicPlayer.js"
import { playlistInstance, songListInstance } from "./script.js"

export default function MessageHandler() {

    const parseMessage = (data) => {
        const event = JSON.parse(data);
        switch (event.type) {
            case 'connect':
                connect(event)
                break;
            case 'add':
                add(event)
                break;
            case 'remove':
                remove(event)
        }
    }

    const connect = (event) => {
        // load the playlist and songs
        playlistInstance.addSongs(event.playlist)
        songListInstance.addSongs(event.songs)
        musicPlayer.setCurrentState(event.state)
    }

    const add = (event) => {
        // update the playlist
        var song = songListInstance.getSongById(event.song);
        if (song) {
            playlistInstance.addSong(song);
        }
    }

    const remove = (event) => {
        var song = songListInstance.getSongById(event.song)
        if (song) {
            playlistInstance.removeSong(song)
        }
    }

    return {
        parseMessage
    }
}