// import Chat from "./Chat";
import UserNotification from "./UserNotificationSocket";

const socketNodes = {
  // Chat: Chat.getInstance(),
  UserNotification: UserNotification.getInstance(),
};
const authenticateAll = (token: string) => {
  Object.values(socketNodes).forEach((node) => node.authenticate(token));
};
const logoutAll = () => {
  Object.values(socketNodes).forEach((node) => node.logout());
};

export default { ...socketNodes, authenticateAll, logoutAll };
