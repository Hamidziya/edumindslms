const User = require("../models/User");
const Blog = require("../models/Blog");
const { convert } = require("html-to-text");
const commonjs = require("../config/common");

const fs = require("fs");
const path = require("path");
const { status } = require("express/lib/response");

exports.saveBlog = [
  commonjs.fields([
    { name: "blogImage", maxCount: 1 },
    { name: "tagImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const toSave = JSON.parse(req.body.data);

      // Save blogImage if uploaded
      if (req.files["blogImage"]) {
        toSave.blogImage = req.files["blogImage"][0].filename;
      }

      // Save tagImage if uploaded
      if (req.files["tagImage"]) {
        toSave.tagImage = req.files["tagImage"][0].filename;
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
  commonjs.fields([
    { name: "blogImage", maxCount: 1 },
    { name: "tagImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const toUpdate = JSON.parse(req.body.data);
      const blogId = toUpdate.blogId;

      const blog = await Blog.findByPk(blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (req.files["blogImage"]) {
        toUpdate.blogImage = req.files["blogImage"][0].filename;
      }

      if (req.files["tagImage"]) {
        toUpdate.tagImage = req.files["tagImage"][0].filename;
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
    const { blogType } = req.body;

    const filterCondition = {
      isDelete: false,
      isActive: true,
    };

    if (blogType) {
      filterCondition.blogType = blogType;
    }

    const blogs = await Blog.findAll({
      where: filterCondition,
    });

    if (!blogs || blogs.length === 0) {
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

exports.getBlogListDashboard = async (req, res) => {
  try {
    const { blogType } = req.body;

    const filterCondition = {
      isDelete: false,
      // isActive: true,
    };

    if (blogType) {
      filterCondition.blogType = blogType;
    }

    const blogs = await Blog.findAll({
      where: filterCondition,
    });

    if (!blogs || blogs.length === 0) {
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

    res.status(200).json({
      message: "Blog List",
      status: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogListEdumedia = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        isDelete: false,
        blogType: "edumedia",
      },
    });

    if (!blogs || blogs.length === 0) {
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
    } else {
      res.status(200).json({
        message: "Blog list",
        status: "success",
        data: blogs,
      });
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

// exports.youtubelist = async (req, res) => {
//   const list = req.body.blogId;
//   try {
//     let bloglist = await Blog.findAll({
//       where: {
//         isDelete: true,
//       },
//     });

//     if (!bloglist) {
//       return res.status(400).json({
//         message: "No list found",
//         status: "success",
//         data: [],
//       });
//     }

//     return res.status(200).json({
//       message: "List of the youtube blogs",
//       status: "success",
//       data: bloglist,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
