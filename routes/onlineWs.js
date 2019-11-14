const WebSocket = require('ws');
const User = require('../models/user');


const wss = new WebSocket.Server({path: '/online', port: 8081});


wss.on('connection', function connection(ws) {
    let clientId;
    ws.pingssent = 0;
    let interval = setInterval(function() {
        if (ws.pingssent >= 2) {// how many missed pings you will tolerate before assuming connection broken.
            ws.close();
        } else {
            ws.ping();
            ws.pingssent++;
        }
    }, 5*1000);// 75 seconds between pings
    ws.on("pong", function() { // we received a pong from the client.
        ws.pingssent = 0; // reset ping counter.
    });
    ws.on('error', (err) => {
        console.log('onlineWS error',err);
    });
    ws.on('message', (message) => {
            console.log('OnlineInput', message);
            let data = JSON.parse(message);
            switch (data.method) {
                case 'connect': {
                    console.log('id', data.id);
                    clientId = data.id;
                    break;
                }
                case 'change': {
                    User.update(clientId, {online_status: data.status});
                    break;
                }
                case 'offline': {
                    User.update(clientId, {online_status: 'offline', place_id: null});
                    break;
                }
                default: {
                    User.update(clientId, {online_status: 'offline', place_id: null});
                }
            }
        }
    );

    ws.on('close', (event) => {
        console.log('wsClose', event.reason);
        User.update(clientId, {online_status: 'offline', place_id: NULL});
    })


});
