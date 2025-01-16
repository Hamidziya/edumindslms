const User = require("../models/User");
const Blog = require("../models/Blog");
const { convert } = require("html-to-text");
const commonjs = require("../config/common");

const fs = require("fs");
const path = require("path");

exports.saveBlog = [
  commonjs.single("image"),
  async (req, res) => {
    const toSave = JSON.parse(req.body.data);
    try {
      if (req.file) {
        toSave.blogImage = req.file.filename;
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

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    // const sanitizedBlogs = blogs.map((blog) => {
    //   return {
    //     ...blog.toJSON(),
    //     description: convert(blog.description),
    //   };
    // });

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogListEduminds = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogType: "eduminds",
      },
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    // const sanitizedBlogs = blogs.map((blog) => {
    //   return {
    //     ...blog.toJSON(),
    //     description: convert(blog.description),
    //   };
    // });

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogListEduplaced = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogType: "eduplaced",
      },
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    // const sanitizedBlogs = blogs.map((blog) => {
    //   return {
    //     ...blog.toJSON(),
    //     description: convert(blog.description),
    //   };
    // });

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogListEthree = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogType: "ethree",
      },
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "Blog Not Found" });
    }

    // const sanitizedBlogs = blogs.map((blog) => {
    //   return {
    //     ...blog.toJSON(),
    //     description: convert(blog.description),
    //   };
    // });

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

exports.activateBlog = async (req, res) => {
  const toUpdate = req.body;
  const blogId = req.body.blogId;

  try {
    const updated = await Blog.update(toUpdate, {
      where: { blogId: blogId },
    });

    if (updated) {
      res.status(200).json({
        message: "Blog Updated successfully",
        status: "success",
        //data: updated,
      });
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

exports.saveReviewBlog = async (req, res) => {
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
