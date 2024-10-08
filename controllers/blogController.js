const User = require("../models/User");
const Blog = require("../models/Blog");

exports.saveBlog = async (req, res) => {
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

exports.getBlogList = async (req, res) => {
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

exports.updateBlog = async (req, res) => {
  const toUpdate = req.body.data;
  const blogId = req.body.data.userid;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res
        .status(200)
        .json({ message: "Blog updated successfully", status: "success" });
    } else {
      res.status(404).json({ message: "Blog not found", status: "error" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  const toUpdate = { isDelete: false };
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
exports.updateReview = async (req, res) => {
  const toUpdate = req.body.data;
  const blogId = req.body.data.userid;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res
        .status(200)
        .json({ message: "Blog updated successfully", status: "success" });
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
