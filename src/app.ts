const net = require("net");
const jsonrpc = require("jsonrpc-node");

var server = new jsonrpc.TCP.Server();
// Create a new TCP server.
server = net.createServer(server);
// The port on which the server is listening.
const port = 8080;

// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, function() {
    console.log(`Server listening for connection requests on socket localhost:${port}`);
});