"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFakeDecoder = void 0;
const net_1 = __importDefault(require("net"));
const port = 5403;
const host = 'localhost';
function CreateFakeDecoder() {
    const server = net_1.default.createServer();
    server.listen(port, host, () => {
        console.log(`TCP server listening on ${host}:${port}`);
    });
    let socket;
    server.on('connection', (client) => {
        const clientAddress = `${client.remoteAddress}:${client.remotePort}`;
        if (socket) {
            socket.destroy();
        }
        console.log(`new client connected: ${clientAddress}`);
        socket = client;
    });
    server.on('close', () => {
        socket = null;
    });
    return {
        send(data) {
            if (!socket)
                return;
            if (!socket.destroyed) {
                socket.write(data);
            }
            else {
                if (socket.destroy) {
                    socket.destroy();
                    socket = null;
                }
            }
        },
    };
}
exports.CreateFakeDecoder = CreateFakeDecoder;
