import asyncio
import websockets
import json
from songs import songs
from state import State
import os

clients = []

playlist = [
    {
        'id': 0,
        'name': 'Champagne Poetry',
        'artist': 'Drake',
        'url': 'Drake - Champagne Poetry.mp3',
        'image': 'https://e-cdn-images.dzcdn.net/images/cover/ea8f80f2edb20885ac8aed8751716794/500x500-000000-80-0-0.jpg'
    }
]


state = State()

async def handler(websocket):
    try:
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
            elif event['type'] == 'next':
                event = {
                    'type': 'next'
                }
                if len(playlist) > 0:
                    song = playlist[0]
                    state.setCurrentSong(song)
                    playlist.remove(song)
                for client in clients:
                    if client != websocket:
                        await client.send(json.dumps(event))
    
    except websockets.exceptions.ConnectionClosedError as e:
        print("Client closed connection!")
    except Exception as e:
        print(f"Error - {e}")
    finally:
        clients.remove(websocket)

async def main():
    port = os.env.get('PORT', 8001)
    async with websockets.serve(handler, "0.0.0.0", port):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())
