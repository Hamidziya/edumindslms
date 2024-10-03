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
  const blogId = req.body.blogId;

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
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
