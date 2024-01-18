import React, { useState } from "react";
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
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import CreateBlog from "../pages/CreateBlog";
import ListBlog from "../pages/ListBlog";
import { Layout, Menu, Button, theme } from "antd";
import Login from "../pages/Login";
import Register from "../pages/Register";
const { Header, Sider, Content } = Layout;

const Body = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <CarFilled />,
              label: "Araba Blogları",
            },
            {
              key: "2",
              icon: <HomeFilled />,
              label: "Ev Blogları",
            },
            {
              key: "4",
              icon: <CustomerServiceFilled />,
              label: "Eğlence Blogları",
            },
            {
              key: "5",
              icon: <SmileFilled />,
              label: "Spor ve Sağlıklı Yaşam Blogları",
            },
            {
              key: "6",
              icon: <RocketFilled />,
              label: "Teknoloji Blogları",
            },
            {
              key: "7",
              icon: <ShoppingFilled />,
              label: "Moda ve Giyim Blogları",
            },
            {
              key: "8",
              icon: <StarFilled />,
              label: "Favori Bloglar",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/list-blog" element={<ListBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Body;
