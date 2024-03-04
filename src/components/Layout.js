import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  GiftOutlined,
  FolderViewOutlined,
  UserAddOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import UserLogin from "./UserLogin";
import managerPH from "../images/pngwing.com.png";
const { Header, Content, Sider } = Layout;
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
  getItem("Workers", "sub1", <UserOutlined />, [
    getItem("Show Workers", "Show/Workers", <FolderViewOutlined />),
    getItem("Add Worker", "Add/Worker", <UserAddOutlined />),
  ]),
  getItem("Services", "sub2", <AppstoreOutlined />, [
    getItem("Show Services", "Show/Services", <FolderViewOutlined />),
    getItem("Add Service", "Add/Service", <AppstoreAddOutlined />),
  ]),
  getItem("Offers", "sub4", <GiftOutlined />, [
    getItem("Show Offers", "Show/Offers", <FolderViewOutlined />),
    getItem("Add Offer", "Add/Offers", <FileAddOutlined />),
  ]),
  getItem("View Cars", "Show/Cars", <FolderViewOutlined />),
  getItem("View Total Profit", "Show/Total-Profit", <FolderViewOutlined />),
];
const MyLayout = ({ children }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  let current = window.location.pathname.slice(1);
  let superKey;
  const onClick = (e) => {
    superKey = e.keyPath[1];
    navigate(`/${e.key}`);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        <Logo />
        <UserLogin name="Manager" image={managerPH} state="logOut" />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="inline"
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
              color: "black",
            }}
          >
            <Breadcrumb.Item>{current}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              // maxHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default MyLayout;
