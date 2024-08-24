class State:
    def __init__(self) -> None:
        self.currentSong = {
            'id': 1,
            'name': f'On & On',
            'author': f'Cartoon, Jéja',
            'url': f'music/Cartoon, Jéja - On & On (feat. Daniel Levi) [NCS Release].mp3'
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
