export default (function () {
    let websocket = new WebSocket('ws://127.0.0.1:8001/')
    let connected = false

    const connect = () => {
        return new Promise((res, rej) => {
            websocket.onopen = () => {
                connected = true
                sendMessage({
                    type: 'connect'
                })
                res()
            }

            websocket.onerror = () => {
                connected = false
                rej("Failed to make connection")
            }

            websocket.onclose = () => {
                connected = false
            }
        })
    }
    
    let makeConnection = connect()

    const sendMessage = async (message) => {
        await makeConnection

        if (connected && websocket) {
            websocket.send(JSON.stringify(message))
        } else {
            throw new Error("Websocket not connected")
        }
    }

    const receiveMessage = async (callback) => {
        if (websocket) {
            websocket.onmessage = (event) => callback(event)
        }
    }

    return {
        sendMessage,
        receiveMessage
    }
})();