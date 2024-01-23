import React, { useEffect } from "react";
import { Layout, Menu, Button, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate(); // useNavigate hook'unu kullanın
  

  useEffect(() => {
    console.log("Sayfa değişti:", location.pathname);
    console.log("isLoggedIn:", isLoggedIn);
  }, [location.pathname, isLoggedIn]);

  const handleLogout = async () => {
  // Çıkış yapılırken loading başlasın
  message.loading({ content: 'Çıkış yapılıyor...', key: 'logoutLoading', duration: 0.4 });

  try {
    await logout();
    // Çıkış yapıldıktan sonra bir süre bekleyip Login sayfasına yönlendir
    setTimeout(() => {
      // Çıkış işlemi tamamlandıktan sonra "Çıkış Yapıldı" mesajını göster
      message.success({ content: 'Çıkış yapıldı.', key: 'logoutSuccess' });
      navigate("/login");
    }, 500); // 1500 milisaniye (1.5 saniye) bekletme süresi
  } catch (error) {
    // Hata durumunda hata mesajını göster
    message.error({ content: 'Çıkış sırasında bir hata oluştu.', key: 'logoutError' });
  }
};


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
              backgroundColor: "magenta",
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
          {isLoggedIn && (
            <>
              <Menu.Item key="/create-blog">
                <Link to="/create-blog">Blog Oluştur</Link>
              </Menu.Item>
              <Menu.Item key="/list-blog">
                <Link to="/list-blog">Bloglarım</Link>
              </Menu.Item>
              <Menu.Item>
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
