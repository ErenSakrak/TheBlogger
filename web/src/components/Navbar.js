import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout>
      <Header
        style={{
          position: "fixed", // position: sticky olarak değiştirildi
          top: 0, // Yukarıdan 0 piksel mesafede sabitlenecek
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between", // Logoyu ve menüyü aralarında boşluk bırakarak hizalayın
          alignItems: "center",
        }}
      >
        {/* Logo bölümü */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "40px", // Logo genişliği
              height: "40px", // Logo yüksekliği
              background: "#fff", // Logo arka plan rengi
              marginRight: "16px",
              backgroundColor: "magenta" // Logo ile menü arasındaki boşluk
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
          style={{
            justifyContent: "flex-end",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Menu.Item key="1">
            <Link to="/">Anasayfa</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/create-blog">Blog Oluştur</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/list-blog">Bloglarım</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
