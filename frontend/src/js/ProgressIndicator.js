export default (() => {

    const audioElement = document.querySelector('audio')

    const seek_slider = document.querySelector("input.seek_slider");
    const curr_time = document.querySelector("div.current-time");
    const total_duration = document.querySelector("div.total-duration");

    const initializeTrack = () => {

        // let updateTimer;

        // clearInterval(updateTimer);
        resetValues();

        setInterval(seekUpdate, 1000);

    }

    function seekUpdate() {
        let seekPosition = 0;

        // Check if the current track duration is a legible number
        if (!isNaN(audioElement.duration)) {
            seekPosition = audioElement.currentTime * (100 / audioElement.duration);
            seek_slider.value = seekPosition;

            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(audioElement.currentTime / 60);
            let currentSeconds = Math.floor(audioElement.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(audioElement.duration / 60);
            let durationSeconds = Math.floor(audioElement.duration - durationMinutes * 60);

            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

            // Display the updated duration
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
    }

    function resetValues() {
        curr_time.textContent = "00:00";
        total_duration.textContent = "00:00";
        seek_slider.value = 0;
    }

    return {
        initializeTrack
    }
})();