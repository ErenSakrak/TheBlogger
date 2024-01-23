import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();

  useEffect(() => {
    // Sayfa değiştikçe seçili menüyü güncelle
    // Bu kod bloğu, "/blog/:id" sayfasına uygun bir şekilde ayarlanabilir
    const pathname = location.pathname;
    console.log("New selected menu:", pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo bölümü */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#fff",
              marginRight: "16px",
              backgroundColor: "magenta"
            }}
          >
            {/* Logo içeriği buraya eklenebilir */}
          </div>
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
            Blogger
          </span>
        </div>

        {/* Menü bölümü */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{
            justifyContent: "flex-end",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Menu.Item key="/">
            <Link to="/">Anasayfa</Link>
          </Menu.Item>
          <Menu.Item key="/create-blog">
            <Link to="/create-blog">Blog Oluştur</Link>
          </Menu.Item>
          <Menu.Item key="/list-blog">
            <Link to="/list-blog">Bloglarım</Link>
          </Menu.Item>
          <Menu.Item key="/register">
            <Link to="/register">Kayıt Ol</Link>
          </Menu.Item>
          <Menu.Item key="/login">
            <Link to="/login">Giriş Yap</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
