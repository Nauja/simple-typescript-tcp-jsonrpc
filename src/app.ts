import * as net from "net"
const jsonrpc = require("jsonrpc-node");

function ping(args: any, reply: any)
{
    reply("pong");
}

export function create_server(ready?: () => void): net.Server
{
    var server = new jsonrpc.TCP.Server();

    server.register("ping", ping);

    // Create a new TCP server.
    server = net.createServer(server);
    
    // The server listens to a socket for a client to make a connection request.
    // Think of a socket as an end point.
    server.listen({host: "0.0.0.0", port: 0}, function() {
        const port = (server.address() as net.AddressInfo).port;
        console.log(`Server listening for connection requests on socket 0.0.0.0:${port}`);
        if (ready !== undefined) {
            ready();
        }
    });

    return server;
}