import useClickOutside from "@hooks/useClickOutside";
import useTheme from "@hooks/useTheme";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import UserNotificationPopoverContent from "./userNotificationPopoverContent";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { getAccessToken } from "lib/auth";
import Badge from "components/badge";
// import sockets from "sockets";
import UserNotificationSocket from "sockets/UserNotificationSocket";
import useSocketListener from "@hooks/useSocketListener";

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

interface UserNotificationPopoverProps {}

const UserNotificationPopover = ({}: UserNotificationPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerEle = useRef(null);
  useClickOutside(() => setIsOpen(false), containerEle.current);
  const theme = useTheme();

  const accessToken = getAccessToken();
  const { data, error } = useSWR(
    accessToken &&
      `${process.env.NEXT_PUBLIC_API_USER_NOTIFICATION}/user-notifications/count`,
    (url) =>
      axios
        .get(`${url}?read=false`, {
          headers: {
            ["Accept-Language"]: "en",
            ...(accessToken && {
              Authorization: `Bearer ${accessToken}`,
            }),
          },
        })
        .then((r) => parseInt(r.data, 10))
  );

  useSocketListener({
    socket: "UserNotification",
    on: "receiveUnreadCount",
    fn: (count) => {
      console.log("socket sendUserUnreadCount", count);
      mutate(
        accessToken &&
          `${process.env.NEXT_PUBLIC_API_USER_NOTIFICATION}/user-notifications/count`,
        count,
        false
      );
    },
  });

  // useEffect(() => {
  //   require("sockets").default.UserNotification.socket.on(
  //     `${UserNotificationSocket.namespace}:receiveUnreadCount`,
  //     (count) => {
  //       console.log("socket sendUserUnreadCount", count);
  //       mutate(
  //         `${process.env.NEXT_PUBLIC_API_USER_NOTIFICATION}/user-notifications/count`,
  //         count,
  //         false
  //       );
  //     }
  //   );
  // }, []);

  return (
    <div ref={containerEle} className="relative pl-2">
      {/* toggle icon */}
      <FaRegBell
        style={{
          fill: isOpen ? theme.colors.primary["500"] : theme.colors.gray["500"],
          ...(!accessToken && { fill: theme.colors.gray["200"] }),
        }}
        className={twCascade("w-5 h-5", accessToken && "cursor-pointer")}
        onClick={() => accessToken && setIsOpen(!isOpen)}
      />
      {(data || 0) > 0 && (
        <Badge
          className="absolute -top-2 -right-2 cursor-pointer"
          text={data}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      {/* top triangle */}
      <div
        className={twCascade(
          "w-6 overflow-hidden inline-block absolute opacity-0 h-0 z-10",
          isOpen && "opacity-100 h-auto"
        )}
        style={{ top: 50 }}
      >
        <div className=" h-4 w-4 bg-white rotate-45 transform origin-bottom-left shadow-lg"></div>
      </div>
      {/* content area */}
      <div
        className={twCascade(
          "absolute w-60 mt-10 -ml-28 h-0 opacity-0 transition-all overflow-hidden rounded-md border border-gray-100 shadow-md hover:shadow-sm",
          isOpen && "opacity-100 h-auto"
        )}
      >
        {/* notification list */}
        <div className="h-72 flex flex-col bg-white">
          <UserNotificationPopoverContent />
        </div>
      </div>
    </div>
  );
};

export default UserNotificationPopover;
