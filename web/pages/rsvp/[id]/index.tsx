import Divider from "components/divider";
import Spacer from "components/spacer";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const scheduleActivities = [
  {
    activity: "ceremony",
    date: "Saturday June 30, 2022",
    time: "10:00AM",
  },
  {
    activity: "ceremony",
    date: "Saturday June 30, 2022",
    time: "10:00AM",
  },
  {
    activity: "ceremony",
    date: "Saturday June 30, 2022",
    time: "10:00AM",
  },
  {
    activity: "ceremony",
    date: "Saturday June 30, 2022",
    time: "10:00AM",
  },
  {
    activity: "ceremony",
    date: "Saturday June 30, 2022",
    time: "10:00AM",
  },
];

const RsvpPage = () => {
  const [rsvpClicked, setRsvpClicked] = useState(false);
  const [rsvpClickReminderOn, setRsvpClickReminderOn] = useState(false);
  const [reminderTimeout, setReminderTimeout] = useState<NodeJS.Timeout>(null);

  useEffect(() => {
    setReminderTimeout(
      setTimeout(() => setRsvpClickReminderOn(true), 1000 * 20)
    );
  }, []);

  const onRsvpClick = () => {
    // clear everything
    setRsvpClicked(true);
    setRsvpClickReminderOn(false);
    clearTimeout(reminderTimeout);
    setReminderTimeout(null);
  };

  return (
    <div className="flex h-full md:h-auto md:flex-col-reverse md:overflow-y-auto">
      <div className="relative flex-1 md:flex-none text-center overflow-y-auto overflow-x-hidden">
        {/* names */}
        <h4
          className="text-center md:text-4xl mt-16 md:mt-20 px-2 italic text-gray-700"
          style={{ fontFamily: "Miama" }}
        >
          Calvin + Joanna's Wedding
        </h4>
        {/* request to join our wedding */}
        <h5 className="max-w-xl mx-auto my-16 px-8">
          request the pleasure of your company at our wedding. Reception to
          follow.
        </h5>
        {/* time of event */}
        <h5 className="underline text-center mt-16">
          Saturday June 30, 2022
          <br />
          3:00PM
        </h5>
        <Spacer height={70} />
        {/* location */}
        <p className="text-center">
          Island Shangri-La
          <br />
          Pacific Place, Supreme Court Road
          <br />
          Central, Hong Kong
        </p>
        <Divider className="my-10 self-center mx-auto" size="75%" />
        <h6>SCHEDULE</h6>
        <Spacer height={20} />
        {scheduleActivities.map((scheduleActivity, scheduleActivityIndex) => (
          <div key={scheduleActivityIndex} className="my-5">
            <h4 className="text-center">CEREMONY</h4>
            <p className="italic text-center">
              Saturday June 30, 2022
              <br />
              10:00AM
            </p>
          </div>
        ))}
        <Spacer height={60} />
        <div
          className="fixed top-0 left-0 w-full"
          style={{
            boxShadow: "0 0 100px 40px rgb(255, 255, 255)",
            height: 100,
            marginTop: -100,
          }}
        />
        <div
          className="fixed bottom-0 left-0 w-full"
          style={{
            boxShadow: "0 0 100px 40px rgb(255, 255, 255)",
            height: 100,
            marginBottom: -100,
          }}
        />
      </div>
      <div className="md:flex-auto flex-1 relative bg-green-300 md:h-96">
        <Image
          layout="fill"
          objectFit="cover"
          src="/images/wedding_photo_sample.jpeg"
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ boxShadow: "inset 0 0 300px rgba(0, 0, 0, 0.5)" }}
        />
      </div>
      <a
        className="fixed bottom-6 left-6 w-24 h-24 shadow-xl rounded-full bg-green-500 hover:bg-green-400 active:bg-green-300 cursor-pointer flex items-center justify-center"
        onClick={onRsvpClick}
      >
        {rsvpClickReminderOn && (
          <span className="animate-ping absolute flex h-full w-full rounded-full bg-green-400 opacity-75 transform scale-50"></span>
        )}
        <h6 className="text-white drop-shadow font-bold text-xl select-none">
          RSVP
        </h6>
      </a>
    </div>
  );
};

export default RsvpPage;
