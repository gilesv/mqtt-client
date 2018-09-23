const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost/1883');
const broker = require('./broker.js');

/**
 * Subscriber
 */
let WebSocketServer = require('ws').Server;
wss = new WebSocketServer({ port: 8080, path: '/testing' });
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('Client: %s ', message);
        message = JSON.parse(message);
        if(message.type == "subscribe") {
            client.subscribe(message.topic);
        } else {
            client.unsubscribe(message.topic);
        }
    });
    console.log('new connection');
    ws.send('Msg from server: all set.');

    /* sends to html page */
    client.on('message', (topic, message) => {
        ws.send(topic + ' => ' + message);
    });
});


/**
 * Publisher
 */
const interval = setInterval( function() {
    client.publish('computer_science', 'random CS bullshit');
    client.publish('finances', 'random finances bullshit');
    client.publish('politics', 'random politics bullshit');
}, 2000);

