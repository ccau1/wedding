import { useEffect } from "react";
import SocketBase from "sockets/SocketBase";

const useSocketListener = (opts: {
  socket: SocketBase | string;
  on: string;
  fn: (data: any) => void;
}) => {
  useEffect(() => {
    const socketInstance =
      typeof opts.socket === "string"
        ? require("sockets").default[opts.socket]
        : opts.socket;
    socketInstance.socket.on(`${socketInstance.namespace}:${opts.on}`, opts.fn);
    socketInstance.socket.on("disconnect", () => {
      socketInstance.socket.off(
        `${socketInstance.namespace}:${opts.on}`,
        opts.fn
      );
    });
  }, []);
};

export default useSocketListener;
