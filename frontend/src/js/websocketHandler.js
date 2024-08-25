import MessageHandler from "./messageHandler.js";

export default (function () {
    let websocket = new WebSocket('wss://jamsesh-server.onrender.com/')
    let connected = false
    let messageHandler = MessageHandler()
    let messageQueue = []

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
                reconnect()
            }

            websocket.onmessage = ({ data }) => {
                messageHandler.parseMessage(data)
            }

        })
    }

    let makeConnection = connect()

    const sendMessage = async (message) => {
        await makeConnection

        if (connected && websocket) {
            while (messageQueue.length) {
                websocket.send(JSON.stringify(messageQueue.shift()));
            }
            websocket.send(JSON.stringify(message))
        } else {
            messageQueue.push(message)
            throw new Error("Websocket not connected")
        }
    }

    const reconnect = () => {
        connected = false;
        setTimeout(() => {
            makeConnection = connect()
        }, 500)
    }

    return {
        sendMessage,
    }
})();