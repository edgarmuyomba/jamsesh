import play from "../assets/play.png";
import pause from "../assets/pause.png";
import musicIcon from "../assets/music.png";


export default function UI() {
    const playlistDiv = document.querySelector('div.playlist ul');
    const songsDiv = document.querySelector('div.songs ul');
    const songInfoDiv = document.querySelector('div.info > p.text')
    const playPauseImage = document.querySelector('div.playpause img')
    const coverArtDiv = document.querySelector('div.album');

    const newSong = (song, isSong = false) => {
        const listItem = document.createElement('li');
        listItem.dataset.id = song.id;
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        const icon = document.createElement('span');
        icon.classList.add('icon');
        icon.style.backgroundImage = `url(${musicIcon})`;
        songDiv.appendChild(icon);
        const details = document.createElement('div');
        details.classList.add('details');
        const name = document.createElement('p');
        name.classList.add('name');
        name.textContent = song.name;
        details.appendChild(name);
        const artist = document.createElement('p');
        artist.classList.add('artist');
        artist.textContent = song.artist;
        details.appendChild(artist);
        songDiv.appendChild(details);
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        if (isSong) {
            const addButton = document.createElement('button');
            addButton.dataset.id = song.id;
            addButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus</title><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>`;
            addButton.onclick = eventListeners.addSongToPlaylist;
            buttons.appendChild(addButton);
        } else {
            // const playButton = document.createElement('button');
            // playButton.dataset.id = song.id;
            // playButton.innerHTML = `<svg fill="green" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>play</title><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>`;
            // // onclick
            // buttons.appendChild(playButton);
            const delButton = document.createElement('button');
            delButton.dataset.id = song.id;
            delButton.innerHTML = `<svg fill="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`;
            delButton.onclick = eventListeners.removeSongFromPlaylist
            buttons.appendChild(delButton);
        }

        songDiv.appendChild(buttons);
        listItem.appendChild(songDiv);

        return listItem;
    }

    const addToSongs = (song) => {
        const newSongDiv = newSong(song, true);
        songsDiv.appendChild(newSongDiv);
    }

    const addToPlaylist = (song) => {
        const newSongDiv = newSong(song);
        playlistDiv.appendChild(newSongDiv);
    }

    const removeFromSongs = () => {
        // after playing the next song
    }

    const removeFromPlaylist = (song) => {
        // removed by a user
        let id = song.id;
        let element = document.querySelector(`li[data-id="${id}"]`);
        element.remove();
    }

    const updateCurrentSongInfo = (song) => {
        const text = `${song.name} by ${song.artist}`
        songInfoDiv.textContent = text
    }

    const updatePlayPauseSong = (isPlaying) => {
        isPlaying ?
            playPauseImage.src = pause :
            playPauseImage.src = play
    }

    const updateCoverArt = (url) => {
        coverArtDiv.style.backgroundImage = `url(${url})`;
    }

    return {
        addToSongs,
        addToPlaylist,
        removeFromSongs,
        removeFromPlaylist,
        updateCurrentSongInfo,
        updatePlayPauseSong,
        updateCoverArt
    }
}