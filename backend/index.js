var webSocketsServerPort = 8000;
var webSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer();
server.listen(webSocketsServerPort);
console.log('listening on port 8000');
var wsServer = new webSocketServer({
    httpServer: server
});
var clients = {};
var getUniqueID = function () {
    var s4 = function () { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); };
    return s4() + s4() + '-' + s4();
};
wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ', message.utf8Data);
            for (var key in clients) {
                clients[key].sendUTF(message.utf8Data);
                clients[key].sendUTF(Object.getOwnPropertyNames(clients));
            }
        }
    });
    connection.on('close', function () {
        console.log('User disconnected' + connection);
    });
});
