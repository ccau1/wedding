import { twCascade } from "@mariusmarais/tailwind-cascade";
import axios from "axios";
import Alert from "components/alert";
import ListItem from "components/listItem";
import { getAccessToken } from "lib/auth";
import extractApiErrors from "lib/extractApiErrors";
import moment from "moment";
import useSWR from "swr";

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

interface UserNotificationPopoverContentProps {}

const UserNotificationPopoverContent =
  ({}: UserNotificationPopoverContentProps) => {
    const accessToken = getAccessToken();
    const { data, error } = useSWR(
      accessToken &&
        `${process.env.NEXT_PUBLIC_API_USER_NOTIFICATION}/user-notifications?localize=true&limit=10`,
      (url) =>
        axios(url, {
          headers: {
            ["Accept-Language"]: "en",
            ...(accessToken && {
              Authorization: `Bearer ${accessToken}`,
            }),
          },
        }).then((r) => r.data)
    );

    return (
      <>
        {error && (
          <Alert text={extractApiErrors(error).__global} className="text-xs" />
        )}
        {/* notification list */}
        <div className="flex-1 overflow-y-auto">
          {(data?.docs || []).map((notification, notificationIndex) => (
            <ListItem
              key={notification._id}
              icon={notification.images?.[0]?.url}
              title={notification.title}
              subtitle={notification.message}
              // unread notification dot
              left={() => (
                <span className="flex h-2 w-2 relative mr-2">
                  <span
                    className={twCascade(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      !notification.read && "bg-red-500"
                    )}
                  ></span>
                  <span
                    className={twCascade(
                      "relative inline-flex rounded-full h-2 w-2",
                      !notification.read && "bg-red-500"
                    )}
                  ></span>
                </span>
              )}
              rightText={moment(notification.createdAt).fromNow()}
              rightTextClassName="text-xs"
              titleClassName="-ml-2"
              subtitleClassName="text-xs -ml-2"
              className="py-1 hover:bg-gray-50"
              onClick={() => null}
              topDivider={notificationIndex > 0}
              dividerClassName="bg-gray-100 my-0"
            />
          ))}
          <small className="text-center block text-gray-300">no more</small>
        </div>
        {/* bottom panel */}
        <div className="flex flex-row justify-between items-center px-3 py-2 border-t border-gray-100">
          <small>55 notifications</small>
          <a
            href="/notifications"
            className="cursor-pointer text-primary-500 text-xs py-1 px-2 -mr-2 hover:bg-gray-50"
          >
            See All
          </a>
        </div>
      </>
    );
  };

export default UserNotificationPopoverContent;
