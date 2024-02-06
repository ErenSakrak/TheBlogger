import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CustomerServiceFilled,
  CarFilled,
  SmileFilled,
  HomeFilled,
  RocketFilled,
  ShoppingFilled,
  StarFilled,
} from "@ant-design/icons";
import { Layout, Menu, Button, Spin, theme } from "antd";
import RoutePages from "../pages/RoutePages";
import CreateBlog from "../pages/CreateBlog";
import ListBlog from "../pages/ListBlog";
import Login from "../pages/Login";
import Register from "../pages/Register";

const { Sider, Content } = Layout;

const Body = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(false); // Loading state'i eklendi
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    { key: "1", icon: <CarFilled />, label: "Araba Blogları", to: "/car-blog" },
    { key: "2", icon: <HomeFilled />, label: "Ev Blogları", to: "/home-blog" },
    {
      key: "4",
      icon: <CustomerServiceFilled />,
      label: "Eğlence Blogları",
      to: "/fun-blog",
    },
    {
      key: "5",
      icon: <SmileFilled />,
      label: "Spor ve Sağlıklı Yaşam Blogları",
      to: "/sportandlife-blog",
    },
    {
      key: "6",
      icon: <RocketFilled />,
      label: "Teknoloji Blogları",
      to: "/technology-blog",
    },
    {
      key: "7",
      icon: <ShoppingFilled />,
      label: "Moda ve Giyim Blogları",
      to: "/fashion-blog",
    },
    {
      key: "8",
      icon: <StarFilled />,
      label: "Favori Bloglar",
      to: "/favorite-blog",
    },
  ];

  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuClick = () => {
    setLoading(true); // Loading başlat
    // Menü elemanına tıklandığında Sider'ı collapsed hale getir
    setCollapsed(true);
  };

  const simulateAsyncProcess = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3); // İstenilen süre (ms cinsinden)
    });
  };

  const handleAsyncProcess = async () => {
    try {
      await simulateAsyncProcess(); // Asenkron işlemi beklet
    } finally {
      setLoading(false); // Loading'i durdur
    }
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        collapsedWidth={50}
      >
        <div className="demo-logo-vertical" />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 50,
            height: 64,
            color: "white",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            menuItems.find((item) => item.to === currentPath)?.key || "1",
          ]}
          selectedKeys={[currentPath]}
          style={{ borderRight: 0 }}
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.to}
              icon={item.icon}
              onClick={() => {
                handleMenuClick();
                handleAsyncProcess(); // Asenkron işlemi başlat
              }}
            >
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 34,
            paddingTop: 40,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {loading ? (
            <Spin size="large" />
          ) : (
            <Routes>
              <Route path="*" element={<RoutePages />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/list-blog" element={<ListBlog />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Body;
