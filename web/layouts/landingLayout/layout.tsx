import { twCascade } from "@mariusmarais/tailwind-cascade";
import { Menu } from "components/menu";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./layout.module.scss";

interface LandingLayoutProps {
  children?: React.ReactNode;
}

const HEADER_HEIGHT_MAX = 100;

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const router = useRouter();
  useEffect(() => {
    const stickyScrollListener = function () {
      const header = document.getElementById("layout_header");
      header.classList.toggle(styles.headerSticky, window.scrollY > 30);
    };
    // handle sticky
    window.addEventListener("scroll", stickyScrollListener);

    return () => window.removeEventListener("scroll", stickyScrollListener);
  }, []);

  return (
    <div id="layout" className="h-full">
      <header
        id="layout_header"
        className={twCascade(
          "fixed top-0 left-0 w-full bg-gray-400 flex flex-row items-center",
          styles.header
        )}
      >
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <Image src="/images/logo.jpg" width={40} height={40} />
            <p className="ml-2">Company Name</p>
          </div>
          <div className="flex flex-row">
            <Menu.Toggle
              onClick={() => router.push("/jobs")}
              active={/\/jobs/.test(router.asPath)}
            >
              Menu 1
            </Menu.Toggle>
            <Menu.Toggle
              onClick={() => router.push("/posts")}
              active={/\/template\/posts/.test(router.asPath)}
            >
              Menu 2
            </Menu.Toggle>
            <Menu.Toggle
              onClick={() => router.push("/template")}
              active={/\/template$/.test(router.asPath)}
            >
              Menu 3
            </Menu.Toggle>
          </div>
        </div>
      </header>
      <main className="" style={{ paddingTop: HEADER_HEIGHT_MAX }}>
        {children}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-96 bg-gray-700 mb-4" />
        ))}
      </main>
    </div>
  );
};

export default LandingLayout;
