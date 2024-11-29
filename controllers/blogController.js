const User = require("../models/User");
const Blog = require("../models/Blog");

const commonjs = require("../config/common");

const fs = require("fs");
const path = require("path");

exports.saveBlog = [
  commonjs.single("image"), // 'image' is the key for the file in the form-data
  async (req, res) => {
    const toSave = JSON.parse(req.body.data); // Parse JSON data from the request body
    try {
      // Save only the file name in the 'toSave' data
      if (req.file) {
        toSave.blogImage = req.file.filename; // Save only filename in toSave
      }

      const newBlog = await Blog.create(toSave);

      res.status(201).json({
        message: "Blog added successfully",
        status: "success",
        data: newBlog,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.updateBlog = [
  commonjs.single("image"),
  async (req, res) => {
    try {
      const toUpdate = JSON.parse(req.body.data);
      const blogId = toUpdate.blogId;

      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (req.file) {
        toUpdate.blogImage = req.file.filename;
      }

      await Blog.update(toUpdate, {
        where: {
          blogId: blogId,
        },
      });

      res.status(200).json({
        message: "Blog updated successfully",
        status: "success",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];

exports.getBlogList = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
      },
    });
    if (!blogs) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogDetail = async (req, res) => {
  const blogId = req.body.blogId;

  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogId: blogId,
      },
    });
    if (!blogs) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    res.status(200).json({
      message: "Blog Detail",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const toUpdate = { isDelete: true };
  const blogId = req.body.blogId;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res
        .status(200)
        .json({ message: "Blog Deleted successfully", status: "success" });
    } else {
      res.status(404).json({ message: "Blog not found", status: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const toUpdate = { isDelete: false };
  const blogId = req.body.blogId;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res.status(200).json({
        message: "Blog Deleted successfully",
        status: "success",
        data: updated,
      });
    } else {
      res.status(404).json({ message: "Blog not found", status: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const toUpdate = req.body.data;
  const blogId = req.body.data.userid;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res.status(200).json({
        message: "Blog updated successfully",
        status: "success",
        data: updated,
      });
    } else {
      res.status(404).json({ message: "Blog not found", status: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewDetail = async (req, res) => {
  const blogId = req.body.blogId;

  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogId: blogId,
      },
    });
    if (!blogs) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    res.status(200).json({
      message: "Blog Detail",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReviewList = async (req, res) => {
  //const blogId = req.body.blogId;

  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
      },
    });
    if (!blogs) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveReview = async (req, res) => {
  const tosave = req.body.data;
  try {
    const user = await Blog.create(tosave);
    return res
      .status(200)
      .json({ message: "New Blog Saved", status: "success", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.saveReviewDummy = async (req, res) => {
  const tosave = req.body.data;
  try {
    const user = await Blog.create(tosave);
    return res
      .status(200)
      .json({ message: "New Blog Saved", status: "success", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
