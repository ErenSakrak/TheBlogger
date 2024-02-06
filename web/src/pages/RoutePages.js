// Main.js
import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import { Routes, Route } from "react-router-dom";
import CategoryPages from "./CategoryPages";
import CreateBlog from "./CreateBlog";
import ListBlog from "./ListBlog";
import Login from "./Login";
import Register from "./Register";
import MainPages from "./MainPages";



function RoutePages() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating asynchronous operations
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Cleanup
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      
      <Layout style={{ backgroundColor: "white" }}>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Routes>
            <Route path="/" element={<MainPages />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/list-blog" element={<ListBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:category" element={<CategoryPages />} />
          </Routes>
        )}
      </Layout>
    </div>
  );
}

export default RoutePages;
