import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const getCategoryDisplayName = (categoryItem) => {
  // Özel bir kategori adı görüntüleme mantığı buraya eklenir
  // Örneğin, kategori adını düzeltmek için:
  // return categoryItem.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  return categoryItem;
};

function CreateBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [altTitle, setAltTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);

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

  const handleSave = async () => {
    // Form alanlarına giriş kontrolü
    if (!title || !image || !altTitle || !description || !category) {
      message.error("Lütfen tüm alanları doldurun.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("altTitle", altTitle);
    formData.append("description", description);
    formData.append("category", category);

    try {
      const response = await fetch("http://localhost:3001/api/saveBlog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Blog saved successfully:", data);

      setTitle("");
      setImage(null);
      setAltTitle("");
      setDescription("");
      setCategory(null);

      message.success("Blog başarıyla kaydedildi.");

      // Kategori sayfasına yönlendirme
      navigate(`/${category}`);
    } catch (error) {
      console.error("Error saving blog:", error);
      message.error("Blog kaydı sırasında bir hata oluştu.");
    }
  };

  const categories = [
    "car-blog",
    "home-blog",
    "fun-blog",
    "sportandlife-blog",
    "technology-blog",
    "fashion-blog",
    "favorite-blog",
  ];

  const handleCategorySelect = ({ key }) => {
    setCategory(key);
  };

  const categoriesMenu = (
    <Menu onClick={handleCategorySelect}>
      {categories.map((categoryItem) => (
        <Menu.Item
          key={categoryItem}
          style={category === categoryItem ? { fontWeight: "bold" } : {}}
        >
          {getCategoryDisplayName(categoryItem)}
        </Menu.Item>
      ))}
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
                {category !== null ? (
                  `Kategori: ${getCategoryDisplayName(category)}`
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
