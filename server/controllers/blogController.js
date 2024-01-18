const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const Blog = require("../models/blogModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/saveBlog", upload.single("image"), async (req, res) => {
  try {
    const { title, altTitle, description } = req.body;

    // Dosya yükleme işlemi başarısız olursa
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "File upload failed" });
    }

    const imagePath = req.file.path.replace("public", "");

    const newBlog = new Blog({
      title,
      image: imagePath,
      altTitle,
      description,
    });

    await newBlog.save();

    res.status(201).json({ success: true, message: "Blog saved successfully" });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ success: false, message: "Error saving blog" });
  }
});

router.get("/getBlogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs); // JSON yanıtı dön
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Error fetching blogs" }); // JSON yanıtı dön
  }
});

router.put("/updateBlog/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, altTitle, description } = req.body;
    const blogId = req.params.id;

    let updatedFields = {
      title,
      altTitle,
      description,
    };

    if (req.file) {
      // Eğer yeni bir dosya yüklendi ise
      updatedFields.image = req.file.path.replace("public", "");
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedFields, {
      new: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: "Error updating blog" });
  }
});

router.delete("/deleteBlog/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Error deleting blog" });
  }
});

module.exports = router;
