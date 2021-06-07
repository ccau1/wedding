import SocketBase from "./SocketBase";
import ResourceReduxActions from "~/Redux/Resource/actions";
import BadgeActions from "~/Redux/Badge/actions";
import { normalize } from "normalizr";
import Schemas from "~/Services/Schemas";
import { store } from "~/App";
import ChatActions from "~/Redux/Chat/actions";
import ChatService from "~/Services/APIServices/ChatService";

class ChatSocket extends SocketBase {
  constructor(url, token) {
    super(url, token);
  }

  async handleSocket(socket) {
    socket.on(`${ChatSocket.namespace}:receiveMessage`, function(data) {
      const currentUser = store.getState().account.user;
      const selectedRoom = store.getState().chats.selectedRoom;
      const dataChatRoomId =
        typeof data.chatRoom === "string" ? data.chatRoom : data.chatRoom._id;
      console.info("receivingMessage", data, currentUser);
      if (data.user !== currentUser) {
        // if incoming chat message is not by current user and has not been previously received, send received
        if (
          data.userStatuses.findIndex(
            o => o.user === currentUser && o.receivedAt !== undefined
          ) === -1
        ) {
          ChatService.setReceivedMessages([data._id], new Date());
        }
        // if incoming chat message is not by current user and has not been previously received, send received
        if (
          selectedRoom === dataChatRoomId &&
          data.userStatuses.findIndex(
            o => o.user === currentUser && o.viewedAt !== undefined
          ) === -1
        ) {
          ChatService.updateUserInRoomLastViewed(dataChatRoomId, new Date());
        }
      }
      const { entities } = normalize(data, Schemas.chatMessageSchema);
      store.dispatch(
        ResourceReduxActions.addEntities(entities, { toBeginning: true })
      );

      const resources = store.getState().resources;
      let chatRoom = resources.chatRooms[data.chatRoom];
      if (chatRoom) {
        chatRoom = chatRoom.asMutable();
        chatRoom.lastMessage = data;

        const { entities: chatRoomEntities } = normalize(
          chatRoom,
          Schemas.chatRoomSchema
        );

        store.dispatch(ResourceReduxActions.addEntities(chatRoomEntities));
      } else {
        // chat not in resources, let's fetch it now
        // what if user currently has this chatroom open as template?
        // how to check and replace

        // fetch chatroom
        store.dispatch(ChatActions.getRoom(dataChatRoomId, []));
      }
    });
    socket.on(`${ChatSocket.namespace}:receiveUnreadCount`, function({
      count
    }) {
      console.info("receiveUnreadCount", count);
      store.dispatch(BadgeActions.setBadge("messages", count));
    });

    socket.on(`${ChatSocket.namespace}:receiveRoomUnreadCount`, function({
      roomId,
      count
    }) {
      console.info("receiveRoomUnreadCount", roomId, ":", count);
      store.dispatch(BadgeActions.setRoomBadge(roomId, count));
    });
    // TODO it's same to receiveUnreadCount, should we remove that one ????
    socket.on(`${ChatSocket.namespace}:receiveAllUnreadCount`, function(count) {
      console.info("receiveAllUnreadCount", count);
      store.dispatch(BadgeActions.setBadge("messages", count ? count : 0)); // TODO please fix api side error, when this method called, client side get undefined count sometimes
    });
  }

  onAuthFailed(socket, error) {} // eslint-disable-line

  onDisconnect(socket) {} // eslint-disable-line
}

ChatSocket.namespace = "/chat";

ChatSocket.instance = null;
ChatSocket.getInstance = () => {
  if (!ChatSocket.instance) {
    ChatSocket.instance = new ChatSocket(
      `${Config.SOCKET_URL}${ChatSocket.namespace}`
    );
  }
  return ChatSocket.instance;
};

export default ChatSocket;
