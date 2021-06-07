import React from "react";
import Link from "next/link";
import HeaderMenuItem from "components/headerMenuItem";
import Button from "components/button";
import { useRouter } from "next/router";
import { Menu } from "components/menu";
import { useTranslation } from "next-i18next";

const jobsHeaderMenu = {
  text: "menu 1",
  onClick: () => console.log("menu 1 clicked"),
  subMenu: [
    {
      text: "sub-menu 1",
      onClick: () => console.log("sub-menu 1 clicked"),
    },
    {
      text: "sub-menu 2",
      onClick: () => console.log("sub-menu 2 clicked"),
    },
    {
      text: "sub-menu 3",
      subMenu: [
        {
          text: "sub-sub-menu 1",
          onClick: () => console.log("sub-menu 1 clicked"),
        },
        {
          text: "sub-sub-menu 2",
          onClick: () => console.log("sub-menu 2 clicked"),
        },
      ],
    },
  ],
};

const MainMenu = () => {
  const router = useRouter();
  const { t } = useTranslation("page");
  return (
    <div className="flex flex-row">
      <Button
        secondary
        small
        text={"Create Job"}
        className="my-2 rounded-md whitespace-nowrap"
        onClick={() => router.push("/jobs/create")}
      />

      <Menu.Toggle
        onClick={() => router.push("/jobs")}
        active={/\/jobs/.test(router.asPath)}
      >
        {t("jobs")}
      </Menu.Toggle>

      <Menu.Toggle
        onClick={() => router.push("/posts")}
        active={/\/posts/.test(router.asPath)}
      >
        {t("posts")}
      </Menu.Toggle>

      <Menu.Toggle
        onClick={() => router.push("/template")}
        active={/\/template/.test(router.asPath)}
      >
        {t("template")}
      </Menu.Toggle>
      <Menu>
        <Menu.Toggle
          onClick={() => router.push("/template/menu")}
          active={/\/template\/menu/.test(router.asPath)}
        >
          {t("Dropdown menu")}
        </Menu.Toggle>
        <Menu.Content>
          <Menu.Item onClick={() => console.log("click item 1")}>
            Item 1
          </Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
          <Menu.SubMenu toggle={<Menu.Item>Item 4 {"->"}</Menu.Item>}>
            <Menu.Item>Item 4.1</Menu.Item>
            <Menu.Item>Item 4.2</Menu.Item>
            <Menu.Item>Item 4.3</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu toggle={<Menu.Item>Item 5 {"->"}</Menu.Item>}>
            <Menu.Item>Item 5.1</Menu.Item>
            <Menu.Item>Item 5.2</Menu.Item>
            <Menu.Item>Item 5.3</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu toggle={<Menu.Item>Item 6 {"->"}</Menu.Item>}>
            <Menu.Item>Item 6.1</Menu.Item>
            <Menu.Item>Item 6.2</Menu.Item>
            <Menu.Item>Item 6.3</Menu.Item>
          </Menu.SubMenu>
        </Menu.Content>
      </Menu>
    </div>
  );
};

export default MainMenu;
