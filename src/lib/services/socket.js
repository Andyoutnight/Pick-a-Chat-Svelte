import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Your server URL

let socket;

export function initSocket(token) {
    socket = io(SOCKET_URL, {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
    });
    return socket;
}

export function getSocket() {
    if (!socket) throw new Error('Socket not initialized');
    return socket;
}