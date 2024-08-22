import { playlistInstance } from "./script.js";
import UI from "./ui.js";
import websocketHandler from "./websocketHandler.js";

export default (() => {

    const audioElement = document.querySelector('audio')

    const ui = UI()

    let isPlaying = false;

    let currentSong = {}

    const setCurrentState = (state) => {
        setCurrentSong(state.currentSong)
        isPlaying = state.isPlaying
        isPlaying ? audioElement.play() : null
    }

    const setCurrentSong = (song) => {
        currentSong = song
        audioElement.src = song.url
        ui.updateCurrentSongInfo(song)
        audioElement.load()
    }

    const playPauseSong = () => {
        isPlaying ? audioElement.pause() : audioElement.play()
        isPlaying = !isPlaying
    }

    const nextSong = async (sendMessage = true) => { 
        const _songs = playlistInstance.songs
        if (_songs.length > 0) {
            let song = _songs[0]
            setCurrentSong(song)
            playlistInstance.removeSong(song)
            if (isPlaying) {
                audioElement.play()
                isPlaying = true
            }
            sendMessage ? await websocketHandler.sendMessage({ type: 'next' }) : null
        }
    }

    const prevSong = () => { }

    return {
        get isPlaying() { return isPlaying },
        get currentSong() { return currentSong },
        setCurrentState,
        setCurrentSong,
        playPauseSong,
        nextSong,
        prevSong
    }

})();