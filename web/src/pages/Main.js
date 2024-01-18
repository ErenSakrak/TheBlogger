import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, Row, Col, Spin } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;

function Main() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Burada asenkron işlemleri gerçekleştiriyor gibi varsayalım
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: "0 16px" }}>
        <Title level={1} style={{ margin: 0 }}>EN YENİLER</Title>
      </Header>
      <Content style={{ padding: "16px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <div style={{ background: "#fff", padding: "16px", minHeight: 360 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Blog Post 1" style={{ marginBottom: "16px" }}>
                  Content of Blog Post 1
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Blog Post 2" style={{ marginBottom: "16px" }}>
                  Content of Blog Post 2
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Blog Post 3" style={{ marginBottom: "16px" }}>
                  Content of Blog Post 3
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default Main;
