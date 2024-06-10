import React, { useEffect } from "react";
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
import { getAuthUser, getUserData, setUserData } from "../helper/Storage";
import { Oval } from "react-loader-spinner";
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

const Owner = [
  getItem("Owners", "sub1", <UserOutlined />, [
    getItem("Show Owners", "Owner/Show/Owners", <FolderViewOutlined />),
    getItem("Add Owners", "Owner/Add/Owner", <UserAddOutlined />),
  ]),
  getItem("Managers", "sub2", <AppstoreOutlined />, [
    getItem("Show Managers", "Owner/Show/Managers", <FolderViewOutlined />),
    getItem("Add Manager", "Owner/Add/Manager", <UserAddOutlined />),
  ]),
  getItem("Branches", "sub4", <GiftOutlined />, [
    getItem("Show Branches", "Owner/Show/Branches", <FolderViewOutlined />),
    getItem("Add Branch", "Owner/Add/Branch", <UserAddOutlined />),
  ]),
];

const Manager = [
  getItem("workers", "sub1", <UserOutlined />, [
    getItem("Show Workers", "Manager/Show/workers", <FolderViewOutlined />),
    getItem("Add Worker", "Manager/Add/Worker", <UserAddOutlined />),
  ]),
  getItem("Services", "sub2", <AppstoreOutlined />, [
    getItem("Show Services", "Manager/Show/services", <FolderViewOutlined />),
  ]),
  getItem("Packages", "sub4", <GiftOutlined />, [
    getItem("Show Packages", "Manager/Show/Packages", <FolderViewOutlined />),
  ]),
];
const TopManager = [
  getItem("workers", "sub1", <UserOutlined />, [
    getItem(
      "Show All Workers",
      "Top_Manager/Show/AllWorkers",
      <FolderViewOutlined />
    ),
    getItem("Show Workers", "Top_Manager/Show/workers", <FolderViewOutlined />),
    getItem("Add Worker", "Top_Manager/Add/Worker", <UserAddOutlined />),
  ]),
  getItem("Services", "sub2", <AppstoreOutlined />, [
    getItem(
      "Show Services",
      "Top_Manager/Show/services",
      <FolderViewOutlined />
    ),
    getItem(
      "Show All Services",
      "Top_Manager/Show/AllServices",
      <FolderViewOutlined />
    ),
    getItem("Add Service", "Top_Manager/Add/Service", <AppstoreAddOutlined />),
  ]),
  getItem("Packages", "sub4", <GiftOutlined />, [
    getItem(
      "Show All Packages",
      "Top_Manager/Show/AllPackages",
      <FolderViewOutlined />
    ),
    getItem(
      "Show Packages",
      "Top_Manager/Show/Packages",
      <FolderViewOutlined />
    ),
    getItem("Add Package", "Top_Manager/Add/Package", <FileAddOutlined />),
  ]),
  getItem(
    "Show Customers",
    "Top_Manager/Show/Customers",
    <FolderViewOutlined />
  ),
];
const MyLayout = ({ children }) => {
  let apiLink;
  const logData = getAuthUser();
  const navigate = useNavigate();
  const [Data, setData] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  if (logData.userRole === "OWNER") {
    apiLink = `http://localhost:9090/owners/get-by-id/${logData.id}`;
  } else {
    apiLink = `http://localhost:9090/managers/get-manager-by-id/${logData.id}`;
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(apiLink, {
        method: "GET",
        headers: {
          Authorization:
            "Basic " + btoa(logData.username + ":" + logData.password),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserData(data);
      setData(data);
    } catch (error) {
      console.log("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    if (logData) {
      fetchUserData();
    }
  }, [JSON.stringify(logData)]);

  let Items;
  let current = window.location.pathname.slice(1);
  let superKey;
  const onClick = (e) => {
    superKey = e.keyPath[1];
    navigate(`/${e.key}`);
  };
  if (logData.userRole === "TOP_MANAGER") {
    Items = TopManager;
  }
  if (logData.userRole === "MANAGER") {
    Items = Manager;
  }
  if (logData.userRole === "OWNER") {
    Items = Owner;
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!Data) {
    return (
      <Oval
        visible={true}
        height="200"
        width="200"
        color="blue"
        secondaryColor="#2778c4"
        ariaLabel="oval-loading"
        wrapperClass="spinner"
      />
    );
  }
  return (
    <Layout>
      <Header
        style={{
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        <Logo />
        <UserLogin name={getUserData().userName} image={getUserData().image} />
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
            items={Items}
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
