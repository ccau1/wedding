import TemplateLayout from "@layouts/templateLayout";
import Card from "components/card";
import ListItem from "components/listItem";
import { AnimateSharedLayout } from "framer-motion";
import moment from "moment";
import { useState } from "react";
import { IoSendOutline } from "react-icons/io5";

moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "%ds",
    ss: "%ds",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "%dM",
    MM: "%dM",
    y: "%dY",
    yy: "%dY",
  },
});

const MessengerCompositionPage = () => {
  const [selectedChatRoomId, setSelectedChatRoomId] = useState<string>("");
  return (
    <TemplateLayout>
      <Card className="flex flex-row px-0 py-0" style={{ height: 700 }}>
        <nav className="flex flex-col flex-1 border-r border-green-50">
          <header className="h-14 bg-green-200"></header>
          <div className="bg-green-100 p-2 flex flex-row">
            <input
              type="text"
              className="py-2 px-4 w-auto rounded-3xl flex-1 outline-none"
              placeholder="search..."
            />
          </div>
          <div className="flex-1 bg-white overflow-y-auto">
            <AnimateSharedLayout>
              {chatRooms.map((chatRoom, chatRoomIndex) => (
                <ListItem
                  key={chatRoomIndex}
                  title={chatRoom.name}
                  subtitle={
                    (chatRoom.lastMessage.sentBy
                      ? chatRoom.lastMessage.msg + ": "
                      : "") + chatRoom.lastMessage.msg
                  }
                  subtitleClassName="overflow-ellipsis whitespace-nowrap overflow-hidden"
                  icon={chatRoom.icon}
                  rightText={moment(chatRoom.lastMessage.timestamp).fromNow(
                    true
                  )}
                  topDivider={chatRoomIndex > 0}
                  active={chatRoom._id === selectedChatRoomId}
                  activeColor={"rgba(0, 0, 0, 0.05)"}
                  onClick={() => setSelectedChatRoomId(chatRoom._id)}
                />
              ))}
            </AnimateSharedLayout>
          </div>
        </nav>
        <main className="flex flex-col flex-2">
          <header className="h-14 bg-green-200"></header>
          <main className="flex-1 bg-green-50">
            <div className="flex flex-row items-center justify-center h-full">
              <p className="text-green-300">content area</p>
            </div>
          </main>
          <div className="bg-green-200 p-2 flex flex-row">
            <input
              type="text"
              className="flex-1 py-2 px-4 rounded-3xl outline-none"
              placeholder="Type a message"
            />
            <a className="cursor-pointer p-2 rounded-3xl hover:bg-green-100 ml-2">
              <IoSendOutline size={30} color="#b3b3b3" />
            </a>
          </div>
        </main>
      </Card>
    </TemplateLayout>
  );
};

export default MessengerCompositionPage;

const chatRooms = [
  {
    _id: "609358f6f210f388744b4063",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "60935901f73d90a3de6f14be",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "609359052f400a2124f94e88",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "6093590ed97c7a4ce8007a80",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "60935913e3e8b162ca6f7a3b",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "6093591c5138fe8984d3866a",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "609359275b12f480b5e293f8",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
  {
    _id: "6093592c4ddd0308029f9c90",
    name: "Calvin Au",
    lastMessage: {
      msg: "I hope you get this message",
      timestamp: new Date(),
      sentBy: null,
    },
    icon: "/images/avatar-m-sample.jpg",
  },
];
