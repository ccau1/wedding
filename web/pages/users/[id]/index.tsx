import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import Button from "components/button";
import Card from "components/card";
import Spacer from "components/spacer";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

enum USER_INFO_TAB {
  OVERVIEW = "overview",
  PORTFOLIO = "portfolio",
  REVIEWS = "reviews",
}

const userInfoTabs = [
  {
    text: "Overview",
    value: USER_INFO_TAB.OVERVIEW,
  },
  {
    text: "Portfolio",
    value: USER_INFO_TAB.PORTFOLIO,
  },
  {
    text: "Reviews",
    value: USER_INFO_TAB.REVIEWS,
  },
];

const entryMotionProps = {
  variants: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  initial: "hidden",
  animate: "show",
};

const MotionCard = motion(Card);

const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<USER_INFO_TAB>(
    USER_INFO_TAB.OVERVIEW
  );
  return (
    <Layout headerRight={<MainMenu />}>
      <div className="grid md:grid-flow-col sm:grid-flow-row xs:grid-flow-row gap-3 items-start py-4 max-w-6xl mx-auto">
        <div className="md:col-span-2 xs:col-span-1 sm:w-full xs:w-full">
          <motion.div
            className="shadow-lg"
            {...entryMotionProps}
            transition={{ delay: 0.2 }}
          >
            <Image
              width={100}
              height={50}
              layout={"responsive"}
              className="w-full rounded-md"
              src="/images/stock-photo.jpeg"
            />
          </motion.div>
          <Spacer height={20} />
          <motion.div
            className="flex justify-center"
            {...entryMotionProps}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-row flex-wrap rounded-md overflow-hidden shadow-md">
              {userInfoTabs.map((userInfoTab) => (
                <Button
                  className={twCascade(
                    selectedTab === userInfoTab.value
                      ? "bg-primary-500"
                      : "bg-primary-300"
                  )}
                  text={userInfoTab.text}
                  onClick={() => setSelectedTab(userInfoTab.value)}
                />
              ))}
            </div>
          </motion.div>
          <MotionCard
            className="-mt-6"
            {...entryMotionProps}
            transition={{ delay: 0.5 }}
          >
            <p className="text-center text-gray-400 py-10">
              info panel for:{" "}
              {userInfoTabs.find((u) => u.value === selectedTab)?.text}
            </p>
          </MotionCard>
        </div>
        <div className="">
          <MotionCard {...entryMotionProps} transition={{ delay: 0.8 }}>
            <p className="text-center text-gray-400">right panel</p>
          </MotionCard>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
