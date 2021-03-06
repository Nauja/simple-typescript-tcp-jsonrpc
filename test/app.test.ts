import * as app from "../src/app";
import * as jsonrpc from "jsonrpc-node";
import * as net from "net";

// Describe a sequence of tests
describe("test server RPCs", () => {
    // This is a single test
    it("call ping should send pong", (done) => {
        // Start a new server for this test and wait to be ready
        const server = app.create_server(() => {
            // Connect a client to started server
            const port = (server.address() as net.AddressInfo).port;
            console.log(`server port is ${port}`);
            const client = new jsonrpc.TCP.Client(port, "127.0.0.1");
            // Call the ping function with RPC
            client.call("ping", [], (err: unknown, result: unknown) => {
                // Check the received result is equals to "pong"
                expect(result).toEqual("pong");
                // Properly close the server
                server.close();
                // Notify this test is done
                done();
            });
        });
    });
});
