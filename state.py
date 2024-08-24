class State:
    def __init__(self) -> None:
        self.currentSong = {
            'id': 5,
            'name': 'Atlantis',
            'artist': 'Seafret',
            'url': 'SSeafret - Atlantis.mp3'
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
