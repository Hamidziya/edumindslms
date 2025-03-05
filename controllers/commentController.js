const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const comments = require("../models/comments");
const Detail = require("../models/courseSectionFolder");

require("dotenv").config();

exports.saveComments = async (req, res) => {
  const toSave = req.body;
  try {
    const comment = await comments.create(toSave);
    res.status(200).json({
      message: "Comment saved successfully",
      status: "success",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editComment = async (req, res) => {
  const commentId = req.body.commentId;
  const newContent = req.body;

  try {
    const comment = await comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.update(newContent, {
      where: {
        commentId: commentId,
      },
    });

    res.status(200).json({
      message: "Comment updated successfully",
      status: "success",
      updatedComment: comment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.commentListOnBlog = async (req, res) => {
  try {
    const commentData = await comments.findAll({
      where: {
        isDelete: false,
        blogId: req.body.blogId,
      },
    });

    if (!commentData || commentData.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }

    res.status(200).json({
      message: "Comment List",
      status: "success",
      data: commentData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  const commentId = req.body.commentId;

  try {
    const comment = await comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "comment not found" });
    }

    await comment.update({
      isDelete: true,
    });
    res.status(200).json({
      message: "comment deleted successfully",
      status: "success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
