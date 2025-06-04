import { io } from "socket.io-client";
import { useSocketStore } from "../store/socketStore";
const socket = io("https://groupups-backend.softaims.com", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
  useSocketStore.getState().setIsConnected(true);
  useSocketStore.getState().setConnectionStatus("connected");
});

socket.on("connect_error", (err) => {
  console.error("Connection failed:", err.message);
  useSocketStore.getState().setIsConnected(false);
  useSocketStore.getState().setConnectionStatus("disconnected");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected:", socket.id);
  useSocketStore.getState().setIsConnected(false);
  useSocketStore.getState().setConnectionStatus("disconnected");
});

export default socket;
