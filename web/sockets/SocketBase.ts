/* eslint-disable no-unused-vars */
import Logger from "lib/logger";
import SocketIOClient, { Socket } from "socket.io-client";

export default class SocketBase {
  static namespace: string;
  public socket: Socket;
  public url: string;
  protected token: string;
  public connected: boolean = false;
  protected logger = new Logger({ context: this.namespace });

  constructor(url, token) {
    this.socket = this.connect(url, token);
    this.url = url;
    this.token = token;
  }

  get namespace() {
    return (this.constructor as any).namespace as string;
  }

  connect = (url, token) => {
    if (this.socket) {
      this.socket.off();
      this.socket.disconnect();
      delete this.socket;
      this.socket = null;
    }
    this.socket = SocketIOClient(url, {
      query: { token: token || "" },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
      // first connect using polling, then upgrade to websocket
      // transports: ["polling", "websocket"]
    });

    this.socket.on("connect", () => {
      this.logger.log("socket connect");
      this.connected = true;
      if (token) {
        this.authenticate(token);
      }
      this.socket.on("authenticated", () => {
        console.log("authed?");
        // use the socket as usual
        this._handleSocket(this.socket);
      });
      this.socket.on("unauthorized", (msg) => {
        this._onAuthFailed(this.socket, msg);
      });
      this.socket.on("disconnect", () => {
        this._onDisconnect(this.socket);
        this.connected = false;
      });
    });
    return this.socket;
  };

  authenticate = (token) => {
    if (this.token !== token) {
      this.token = token;
      console.log("emit authenticate", this.url, token);
      // this.socket.io.engine.opts.query.token = token;
      this.socket.emit("authenticate", { token: token });
    }
  };

  logout = () => {
    this.token = "";
    this.socket.emit("logout");
  };

  disconnect = (socket) => {
    socket.disconnect();
    socket.io.reconnecting = undefined;
    socket.io._reconnection = true;
  };

  _onAuthFailed(socket, error) {
    this.onAuthFailed(socket, error);
  }
  onAuthFailed(socket, error) {}

  _handleSocket(socket) {
    this.handleSocket(socket);
  }
  handleSocket(socket) {
    throw new Error("Socket:: method handleSocket must be defined");
  }

  _onDisconnect(socket) {
    this.onDisconnect(socket);
    setTimeout(() => {
      this.connect(this.url, this.token);
    }, 5000);
  }
  onDisconnect(socket) {}
}
