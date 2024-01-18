import React, { useState } from "react";
import {
  Input,
  Upload,
  Button,
  Row,
  Col,
  message,
  Typography,
  Dropdown,
  Space,
  Menu,
} from "antd";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";

const { Title } = Typography;

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [altTitle, setAltTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      setImage(info.file.originFileObj);
    }
  };

  const handleAltTitleChange = (event) => {
    setAltTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    autoExpand(event.target);
  };

  const autoExpand = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleSave = () => {
    // Form alanlarına giriş kontrolü
    if (!title || !image || !altTitle || !description || !selectedCategory) {
      message.error("Lütfen tüm alanları doldurun.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("altTitle", altTitle);
    formData.append("description", description);
    formData.append("category", selectedCategory);

    fetch("http://localhost:3001/api/saveBlog", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Blog saved successfully:", data);
        setTitle("");
        setImage(null);
        setAltTitle("");
        setDescription("");
        setSelectedCategory(null);
        message.success("Blog başarıyla kaydedildi.");
      })
      .catch((error) => {
        console.error("Error saving blog:", error);
        message.error("Blog kaydı sırasında bir hata oluştu.");
      });
  };

  const handleCategorySelect = ({ key }) => {
    setSelectedCategory(key);
  };

  const categoriesMenu = (
    <Menu onClick={handleCategorySelect}>
      <Menu.Item
        key="Araba Blogları"
        style={
          selectedCategory === "Araba Blogları" ? { fontWeight: "bold" } : {}
        }
      >
        Araba Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Ev Blogları"
        style={selectedCategory === "Ev Blogları" ? { fontWeight: "bold" } : {}}
      >
        Ev Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Eğlence Blogları"
        style={
          selectedCategory === "Eğlence Blogları" ? { fontWeight: "bold" } : {}
        }
      >
        Eğlence Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Spor ve Sağlıklı Yaşam Blogları"
        style={
          selectedCategory === "Spor ve Sağlıklı Yaşam Blogları"
            ? { fontWeight: "bold" }
            : {}
        }
      >
        Spor ve Sağlıklı Yaşam Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Teknoloji Blogları"
        style={
          selectedCategory === "Teknoloji Blogları"
            ? { fontWeight: "bold" }
            : {}
        }
      >
        Teknoloji Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Moda ve Giyim Blogları"
        style={
          selectedCategory === "Moda ve Giyim Blogları"
            ? { fontWeight: "bold" }
            : {}
        }
      >
        Moda ve Giyim Blogları
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="Diğer"
        style={selectedCategory === "Diğer" ? { fontWeight: "bold" } : {}}
      >
        Diğer
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="center-container">
      <Title align="middle">Yeni Blog Oluştur</Title>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Input
            style={{ marginBottom: "10px" }}
            className="blog-input"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          <Upload
            style={{ marginBottom: "10px" }}
            showUploadList={false}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            onChange={handleImageChange}
          >
            <Button
              icon={<UploadOutlined />}
              style={{ marginBottom: "10px", marginRight: "10px" }}
            >
              Fotoğraf Yükle
            </Button>
          </Upload>
          <Dropdown overlay={categoriesMenu} trigger={["click"]}>
            <Button>
              <Space>
                {selectedCategory !== null ? (
                  `Kategori: ${selectedCategory}`
                ) : (
                  <>
                    Kategori Seç <DownOutlined />
                  </>
                )}
              </Space>
            </Button>
          </Dropdown>
          <div style={{ textAlign: "center" }}>
            {image && (
              <img
                className="create-image"
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
          <Input
            style={{ marginBottom: "10px" }}
            className="blog-input"
            value={altTitle}
            onChange={handleAltTitleChange}
            placeholder="Alt Title"
          />
          <Input.TextArea
            style={{ marginBottom: "10px" }}
            className="blog-input max-textarea"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Description"
            autoSize={{ minRows: 5 }}
          />
          <Row justify="space-between">
            <Button type="primary" danger onClick={""}>
              Temizle
            </Button>
            <Button
              type="primary"
              onClick={handleSave}
              style={{ width: "100px" }}
            >
              Kaydet
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default CreateBlog;
