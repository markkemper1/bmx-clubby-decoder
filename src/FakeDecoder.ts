import net from 'net';
const port = 5403;
const host = 'localhost';
interface FakeDecoder {
  send: (data: Buffer) => void;
}

export function CreateFakeDecoder(): FakeDecoder {
  const server = net.createServer();

  server.listen(port, host, () => {
    console.log(`TCP server listening on ${host}:${port}`);
  });

  let socket: net.Socket | null;

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
    send(data: Buffer) {
      if (!socket) return;

      if (!socket.destroyed) {
        socket.write(data);
      } else {
        if (socket.destroy) {
          socket.destroy();
          socket = null;
        }
      }
    },
  };
}
