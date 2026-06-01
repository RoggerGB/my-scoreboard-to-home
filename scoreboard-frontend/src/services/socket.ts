import { io, type Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? window.location.origin;

export const socket: Socket = io(socketUrl, {
	autoConnect: false,
	transports: ["websocket"],
});

