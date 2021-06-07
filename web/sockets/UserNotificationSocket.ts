import SocketBase from "./SocketBase";

class UserNotificationSocket extends SocketBase {
  static url = process.env.NEXT_PUBLIC_API_USER_NOTIFICATION;
  static namespace = "/userNotification";
  static instance = null;
  static getInstance = (): UserNotificationSocket => {
    return (
      UserNotificationSocket.instance ||
      new UserNotificationSocket(
        `${UserNotificationSocket.url}${UserNotificationSocket.namespace}`,
        null
      )
    );
  };

  constructor(url, token) {
    super(url, token);
  }
  async handleSocket(socket) {
    socket.on(
      `${UserNotificationSocket.namespace}:receiveNotification`,
      function (data) {
        console.log("SOCKET::receiveNotification", data);

        // const { entities, result } = normalize(
        //   data,
        //   Schemas.userNotificationListSchema
        // );
        // store.dispatch(ResourceReduxActions.addEntities(entities));
        // NotificationActions.mergeUserNotificationsIds(result);
        // store.dispatch(BadgeActions.getNotificationBadge()); // when receiveNotification we get notificationbadge again
      }
    );
    socket.on(
      `${UserNotificationSocket.namespace}:receiveUnreadCount`,
      function (data) {
        console.log("SOCKET::receiveUnreadCount", data);
        // store.dispatch(BadgeActions.setBadge("notifications", data));
      }
    );
  }

  onAuthFailed(socket, error) {} // eslint-disable-line

  onDisconnect(socket) {} // eslint-disable-line
}

export default UserNotificationSocket;
