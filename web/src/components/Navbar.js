import React, { useEffect } from "react";
import { Layout, Menu, Button, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sayfa değişti:", location.pathname);
    console.log("isLoggedIn:", isLoggedIn);
  }, [location.pathname, isLoggedIn]);

  const handleLogout = async () => {
    // Çıkış yapılırken loading başlasın
    message.loading({
      content: "Çıkış yapılıyor...",
      key: "logoutLoading",
      duration: 0.4,
    });

    try {
      await logout();
      // Çıkış yapıldıktan sonra bir süre bekleyip Login sayfasına yönlendir
      setTimeout(() => {
        // Çıkış işlemi tamamlandıktan sonra "Çıkış Yapıldı" mesajını göster
        message.success({ content: "Çıkış yapıldı.", key: "logoutSuccess" });
        navigate("/login");
      }, 400); // 1500 milisaniye (1.5 saniye) bekletme süresi
    } catch (error) {
      // Hata durumunda hata mesajını göster
    }
  };

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          top: 0,
          zIndex: 100,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to right, #001f3f, #0C356A)",
        }}
      >
        {/* Logo bölümü */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="logo.jpg" // Logo resminin yolunu belirtin
            alt="Blogger Logo" // Resmin alternatif metni
            style={{
              width: "110px", // Resmin genişliği
              height: "50px", // Resmin yüksekliği
              marginRight: "16px",
              borderRadius: "15px",
              boxShadow: "1px 1px 15px rgba(255, 255, 255, 0.5)", // Gölge efekti
            }}
          />
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
            backgroundColor:"transparent"
          }}
        >
          <Menu.Item key="/">
            <Link to="/">Anasayfa</Link>
          </Menu.Item>
          {isLoggedIn && (
            <>
              <Menu.Item key="/create-blog">
                <Link to="/create-blog">Blog Oluştur</Link>
              </Menu.Item>
              <Menu.Item key="/list-blog">
                <Link to="/list-blog">Bloglarım</Link>
              </Menu.Item>
              <Menu.Item key="/logout">
                <span style={{ color: "#fff", marginRight: "8px" }}>
                  Merhaba, {username}!
                </span>
                <Button onClick={handleLogout}>Çıkış Yap</Button>
              </Menu.Item>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Menu.Item key="/register">
                <Link to="/register">Kayıt Ol</Link>
              </Menu.Item>
              <Menu.Item key="/login">
                <Link to="/login">Giriş Yap</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;
