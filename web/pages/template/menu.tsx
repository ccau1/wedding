import TemplateLayout from "@layouts/templateLayout";
import { Menu } from "components/menu";
import React from "react";

export default function dropdown() {
  return (
    <div>
      <TemplateLayout>
        <Menu>
          <Menu.Toggle>Hover me</Menu.Toggle>
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
      </TemplateLayout>
    </div>
  );
}
