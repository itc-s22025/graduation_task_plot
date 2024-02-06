import {Server} from 'socket.io';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (!res.socket.server.io) {
        res.socket.server.io = new Server(res.socket.server);
    }
    res.end();
}