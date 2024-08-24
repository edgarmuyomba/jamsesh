class State:
    def __init__(self) -> None:
        self.currentSong = {
            'id': 13,
            'name': 'Atlantis',
            'artist': 'Seafret',
            'url': 'Seafret - Atlantis.mp3',
            'image': 'https://e-cdn-images.dzcdn.net/images/cover/e59a365ce39fd0acf13d40a6da9a11c9/500x500-000000-80-0-0.jpg'
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
