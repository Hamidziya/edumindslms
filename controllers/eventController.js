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
  const { date, titletype, day, description, isDelete, isPermission } =
    req.body;
  const eventId = req.body.eventId;

  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await Event.update({
      date: date,
      titletype: titletype || event.titletype,
      day: day || event.day,
      description: description || event.description,
    });

    res.status(200).json({ message: "Event updated successfully" });
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

exports.removeSpecificEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only Admin Can Remove The Event List" });
    }
    const toUpdate = { isDelete: true };

    await Event.update(toUpdate, {
      where: { eventId: req.body.data.eventId },
    });
    res
      .status(200)
      .json({ message: "Event Removed successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only Admin Can Remove The Event List" });
    }
    const toUpdate = { isDelete: true };

    await Event.update(toUpdate, {
      where: { eventId: req.body.data.eventId },
    });
    res
      .status(200)
      .json({ message: "Event Removed successfully", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
