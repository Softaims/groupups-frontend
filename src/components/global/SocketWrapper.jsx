import socket from "../../../lib/socket";
const SocketWrapper = ({ children }) => {
  if (!socket?.connected) {
    socket?.connect();
  }
  return children;
};

export default SocketWrapper;
