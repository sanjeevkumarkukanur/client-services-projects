import { io } from "socket.io-client";

export const socket = io("http://localhost:3001/chat", {
  autoConnect: false,   // connect manually
reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
