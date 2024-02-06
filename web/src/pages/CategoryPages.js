import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import "../Css/CategoryBlog.css";

function CategoryPages() {
  const { category } = useParams();
  console.log(category);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (category !== undefined) {
          const response = await fetch(
            `http://localhost:3001/api/getBlogs/${category}`
          );
          const data = await response.json();
          setBlogs(data);
          // Verinin boş olup olmadığını kontrol et
          if (data && data.length > 0) {
            // setCategoryData(data); // Unused variable, removed
          } else {
            console.log("Veri bulunamadı.");
          }
        }
      } catch (error) {
        console.error("Error fetching category blogs:", error);
      }
    };

    fetchData(); // fetchData fonksiyonunu useEffect içinde çağırın
  }, [category]);

  return (
    <div className="categoryblog-container">
      <div className="categoryblog-cards">
        {blogs.length === 0 ? (
          <h4 style={{fontSize:"25px", paddingTop:"25px"}}>Not Found !</h4>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="listblog-card">
              <div>
                <h2 className="words-link">
                  <a href="/category-blog" className="categoryblog-title">
                    {blog.title}
                  </a>
                </h2>
              </div>
              <div className="categoryblog-image-box">
                <a href="/category-blog">
                  <img
                    src={`http://localhost:3001/public${blog.image}`}
                    alt=""
                    className="categoryblog-image"
                  />
                </a>
              </div>
              <h4 className="words-link">
                <a href="/category-blog" className="categoryblog-alt-title">
                  {blog.altTitle}
                </a>
              </h4>
              <p className="categoryblog-description">
                {blog.description.length > 150
                  ? `${blog.description.slice(0, 150)}...`
                  : blog.description}
              </p>
              <p className="categoryblog-category">Kategori: {blog.category}</p>
              {blog.description.length > 150 && (
                <Button type="link" className="read-more-link">
                  Devamını Oku
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPages;
