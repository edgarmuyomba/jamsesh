import UI from "./ui.js";

export default (() => {

    const audioElement = document.querySelector('audio')

    const ui = UI()

    let isPlaying = false;

    let currentSong = {}

    const setCurrentState = (state) => {
        setCurrentSong(state.currentSong)
        isPlaying = state.isPlaying
    }

    const setCurrentSong = (song) => {
        currentSong = song
        ui.updateCurrentSongInfo(song)
        audioElement.src = song.url
        audioElement.load()
    }

    const playPauseSong = () => {
        isPlaying ? audioElement.pause() : audioElement.play()
        isPlaying = !isPlaying
     }

    const nextSong = () => { }

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