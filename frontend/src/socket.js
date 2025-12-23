import { io } from "socket.io-client";

const socket = io("https://syncboard-bcknd.onrender.com", {
  transports: ["websocket"],
});

export default socket;
