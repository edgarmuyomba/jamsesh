import asyncio
import websockets
import json
from songs import songs
from state import State

clients = []

playlist = [
    {
        'id': 0,
        'name': f'Follow Back',
        'author': f'LXNGVX',
        'url': f'https://www.song-{1}.com'
    }
]


state = State()

async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)

        if event['type'] == 'connect':
            clients.append(websocket)
            event = {
                'type': 'connect',
                'playlist': playlist,
                'songs': songs,
                'state': state.currentState
            }
            await websocket.send(json.dumps(event))
        elif event['type'] == 'add':
            id = event['id']
            new_song = songs[id]
            if new_song not in playlist:
                playlist.append(new_song)
                event = {
                    'type': 'add',
                    'song': id
                }
                websockets.broadcast(clients, json.dumps(event))
        elif event['type'] == 'remove':
            id = event['id']
            song = songs[id]
            if song in playlist:
                playlist.remove(song)
                event = {
                    'type': 'remove',
                    'song': id
                }
                websockets.broadcast(clients, json.dumps(event))


async def main():
    async with websockets.serve(handler, "", 8001):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())
