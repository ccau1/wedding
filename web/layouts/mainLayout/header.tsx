import React, { useState } from "react";
import Image from "next/image";
import Section from "../../components/section";
import Spacer from "../../components/spacer";
import useTheme from "../../@hooks/useTheme";
import styles from "./layout.module.scss";
import Link from "next/link";
import LocaleSwitcher from "components/localeSwitcher";
import classNames from "lib/classNames";
import Button from "components/button";
import { useRouter } from "next/router";
import Divider from "components/divider";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import { motion } from "framer-motion";
import { getCurrentUser } from "lib/auth";
import UserNotificationPopover from "containers/userNotifications/userNotificationPopover";
import { FaSignOutAlt } from "react-icons/fa";
import Tippy from "@tippyjs/react";

interface HeaderProps {
  headerRight?: React.ReactNode;
}

const Header = ({ headerRight }: HeaderProps) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const user = getCurrentUser();

  return (
    <>
      <header
        className={`${styles.header} bg-white items-center justify-center flex shadow-sm z-10`}
      >
        <Section
          contentClassName={classNames("h-16", styles.headerInner)}
          boxed={theme.layout.headerBoxed}
          horizontalPadding
        >
          <div className="grid grid-flow-col items-center">
            <Link href={"/"}>
              <a className="grid grid-flow-col items-center">
                <div className={styles.logo}>
                  <Image
                    src="/images/logo.jpg"
                    width={30}
                    height={30}
                    alt={"logo"}
                  />
                </div>
                <Spacer width={10} />
                <h6 className="text-black whitespace-nowrap mr-2">
                  my-company
                </h6>
              </a>
            </Link>
          </div>
          <div className="xs:hidden sm:hidden md:grid grid-flow-col items-center">
            {headerRight}
            {headerRight !== undefined && <Divider vertical size={"40%"} />}
            <UserNotificationPopover />
            <LocaleSwitcher />
            <Spacer width={5} />
            {user ? (
              <Tippy
                // options
                content="logout"
                placement="bottom"
                trigger="mouseenter"
              >
                <a
                  onClick={() => router.push("/auth/logout")}
                  className="rounded-full p-3 -ml-2 overflow-hidden hover:bg-gray-100 cursor-pointer"
                >
                  <FaSignOutAlt
                    className="w-6 h-6"
                    style={{ fill: theme.colors.gray["500"] }}
                  />
                </a>
              </Tippy>
            ) : (
              <Button
                text={"Login"}
                className="rounded-3xl"
                onClick={() => router.push("/auth/login?redirect=/")}
              />
            )}
          </div>
          <div className="md:hidden xs:flex sm:flex flex-row justify-center items-center h-full">
            <a
              onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}
              className={twCascade(
                "block px-3 cursor-pointer w-12 h-12 p-2 z-20",
                isHamburgerMenuOpen ? "fixed top-1.5 right-1.5" : "relative"
              )}
            >
              <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={twCascade(
                    "block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out",
                    isHamburgerMenuOpen && "rotate-45",
                    !isHamburgerMenuOpen && "-translate-y-1.5"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={twCascade(
                    "block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out",
                    isHamburgerMenuOpen && "opacity-0"
                  )}
                />
                <span
                  aria-hidden="true"
                  className={twCascade(
                    "block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out",
                    isHamburgerMenuOpen && "-rotate-45",
                    !isHamburgerMenuOpen && "translate-y-1.5"
                  )}
                />
              </div>
            </a>
          </div>
        </Section>
      </header>
      <motion.a
        onClick={() => setIsHamburgerMenuOpen(false)}
        className={twCascade("fixed top-0 left-0 w-full h-full bg-gray-500")}
        animate={isHamburgerMenuOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 0.5,
            zIndex: 10,
          },
          closed: {
            opacity: 0,
            transitionEnd: { zIndex: -10 },
          },
        }}
        initial="closed"
      />
      <div
        className={twCascade(
          "fixed top-0 right-0 w-96 max-w-full h-full bg-white z-10 transform transition-transform",
          isHamburgerMenuOpen ? "translate-x-0" : "translate-x-96"
        )}
      >
        <div className="h-full flex items-center justify-center">
          <div className="text-gray-400">[ Empty hamburger menu ]</div>
        </div>
      </div>
    </>
  );
};
export default Header;
