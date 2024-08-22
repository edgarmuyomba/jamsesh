import MessageHandler from "./messageHandler.js";

export default (function () {
    let websocket = new WebSocket('ws://192.168.100.19:8001/')
    let connected = false
    let messageHandler = MessageHandler()

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

            websocket.onmessage = ({ data }) => {
                messageHandler.parseMessage(data)
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

    const receiveMessage = (callback) => {
        if (websocket) {
            websocket.onmessage = (event) => callback(event)
        }
    }

    return {
        sendMessage,
        receiveMessage
    }
})();