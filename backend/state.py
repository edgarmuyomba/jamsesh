class State:
    def __init__(self) -> None:
        self.currentSong = {
            'id': 13,
            'name': 'Atlantis',
            'artist': 'Seafret',
            'url': 'Seafret - Atlantis.mp3'
        }
        self.isPlaying = False

    @property
    def currentState(self):
        return {
            'currentSong': self.currentSong,
            'isPlaying': self.isPlaying
        }

    def setCurrentSong(self, song):
        self.currentSong = song
