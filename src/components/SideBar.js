import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import manager from "../images/manager.png";
import "../css/SideBar.css";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Workers", "sub1", <MailOutlined />, [
    getItem("Show Workers", "1"),
    getItem("Update Worker", "2"),
    getItem("Delete Worker", "3"),
    getItem("Add Worker", "4"),
  ]),
  getItem("Services", "sub2", <AppstoreOutlined />, [
    getItem("Show Services", "5"),
    getItem("Update Service", "6"),
    getItem("Delete Service", "7"),
    getItem("Add Service", "8"),
  ]),
  getItem("Offers", "sub4", <SettingOutlined />, [
    getItem("Show Offers", "9"),
    getItem("Update Offer", "10"),
    getItem("Delete Offer", "11"),
    getItem("Add Offer", "12"),
  ]),
  getItem("View Cars", "13"),
  getItem("View Total Profit", "14"),
];

const SideBar = () => {
  const [current, setCurrent] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <aside className="app-side" id="app-side">
        <div className="side-content ">
          <div className="menu">
            <Menu
              theme={"light"}
              onClick={onClick}
              inlineCollapsed={collapsed}
              defaultOpenKeys={[current]}
              selectedKeys={[current]}
              mode="inline"
              items={items}
            />
          </div>
        </div>
      </aside>
    </>
  );
};
export default SideBar;
