import { playlistInstance } from "./script.js";
import UI from "./ui.js";
import websocketHandler from "./websocketHandler.js";
import FirebaseHandler from "./FirebaseHandler.js";
import ProgressIndicator from "./ProgressIndicator.js";

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
        ui.updateCoverArt(song.image)
        ProgressIndicator.initializeTrack();
        FirebaseHandler.getStreamUrl(song.url)
        .then((url) => audioElement.src = url);
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

    return {
        get isPlaying() { return isPlaying },
        get currentSong() { return currentSong },
        setCurrentState,
        setCurrentSong,
        playPauseSong,
        nextSong,
    }

})();