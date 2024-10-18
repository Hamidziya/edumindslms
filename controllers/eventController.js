const User = require("../models/User");
const Blog = require("../models/Blog");
const Event = require("../models/Event");

exports.saveEvent = async (req, res) => {
  const tosave = req.body.data;
  try {
    const user = await Event.create(tosave);
    return res
      .status(200)
      .json({ message: "New Event Saved", status: "success", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { username, email, role, isDelete, isPermission } = req.body;
  const userId = req.body.id;

  try {
    const user = await Event.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.update({
      username: username,
      email: email || user.email,
      role: role || user.role,
    });

    res.status(200).json({ message: "Event updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const users = await Event.findAll({
      where: {
        isDelete: false,
      },
    });
    if (!users) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event List",
      status: "success",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
