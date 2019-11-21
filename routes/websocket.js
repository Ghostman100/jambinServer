const WebSocket = require('ws');
const Dialog = require('../models/dialog');
const Users = require('../models/user');

const wss = new WebSocket.Server({port: 8080});

let clients = [];

class Client {
    constructor(id, ws) {
        this.ws = ws;
        this.id = id;
    }
}

wss.on('connection', function connection(ws) {
    let recipientId;
    let client;
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        let data = JSON.parse(message);
        switch (data.method) {
            case 'connect': {
                client = new Client(data.id, ws);
                clients[data.id] = client;
                recipientId = data.connectTo;
                Dialog.getMessages(data.id, data.connectTo, (messages) => {
                    ws.send(JSON.stringify({messages: messages, 'start': 1}));
                });
                break;
            }
            case 'message': {
                Dialog.create(client.id, recipientId, data.text, (message) => {
                    Users.pushNotification(recipientId, 'У вас новое сообщение');
                    if (clients[recipientId]) {
                        clients[recipientId].ws.send(JSON.stringify({senderId: client.id, message: data.text}))
                    }
                });
                break;
            }

        }
    })
});
