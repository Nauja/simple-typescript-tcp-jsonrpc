import * as jsonrpc from "jsonrpc-node";
import * as net from "net";

function ping(args: unknown, reply: (_: unknown) => unknown) {
    reply("pong");
}

export function create_server(ready?: () => void): net.Server {
    // Create a JSON-RPC server
    let server = new jsonrpc.TCP.Server();

    // Register an RPC function
    server.register("ping", ping);

    // Wrap our server with the builtin net.Server
    // We could also start our server standalone
    server = net.createServer(server);

    // Start the server on 0.0.0.0 host with a random port
    server.listen({ host: "0.0.0.0", port: 0 }, function () {
        // Called when the server is ready
        const port = (server.address() as net.AddressInfo).port;
        console.log(
            `Server listening for connection requests on socket 0.0.0.0:${port}`
        );

        // Notify our server is ready if a callback was given
        if (ready !== undefined) {
            ready();
        }
    });

    return server;
}

create_server();
