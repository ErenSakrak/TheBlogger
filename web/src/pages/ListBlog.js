// src/pages/ListBlog.js

import React, { useState, useEffect } from "react";
import { Spin, Button } from "antd";
import { useAuth } from '../auth/AuthContext';
import "../Css/ListBlog.css";

function ListBlog() {
  const { username } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/getBlogs");
        const data = await response.json();
  
        // Veri çekme işlemi tamamlandıktan sonra 2 saniye beklet
        setTimeout(() => {
          const filteredBlogs = username
            ? data.filter(blog => blog.author === username._id)
            : data;
  
          setBlogs(filteredBlogs);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [username]);

  return (
    <div className="blog-container">
      {loading ? (
        <Spin size="large" />
      ) : (
        <div className="blog-cards">
          {blogs.map((blog) => (
            <div key={blog._id} className="listblog-card">
              <div>
                <h2 className="words-link">
                  <a href="/list-blog" className="listblog-title">
                    {blog.title}
                  </a>
                </h2>
              </div>
              <div className="listblog-image-box">
                <a href="/list-blog">
                  <img
                    src={`http://localhost:3001/public${blog.image}`}
                    alt=""
                    className="listblog-image"
                  />
                </a>
              </div>
              <h4 className="words-link">
                <a href="/list-blog" className="listblog-alt-title">
                  {blog.altTitle}
                </a>
              </h4>
              <p className="listblog-description">
                {blog.description.length > 150
                  ? `${blog.description.slice(0, 150)}...`
                  : blog.description}
              </p>
              <p className="listblog-category">Kategori: {blog.category}</p>
              {blog.description.length > 150 && (
                <Button type="link" className="read-more-link">
                  Devamını Oku
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListBlog;
