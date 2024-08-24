import Playlist from './playlist.js'
import SongList from './songList.js'
import { EventListeners } from './eventListeners.js';
import FirebaseHandler from './FirebaseHandler.js';

export const playlistInstance = Playlist();

export const songListInstance = SongList();

const eventListeners = EventListeners();
window.eventListeners = eventListeners;