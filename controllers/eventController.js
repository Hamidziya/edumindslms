const User = require("../models/User");
const Blog = require("../models/Blog");
const Event = require("../models/Event");

exports.saveEvent = async (req, res) => {
  const tosave = req.body.data;
  try {
    const user = await Event.create(tosave);
    return res
      .status(200)
      .json({ message: "New Evebt Saved", status: "success", data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
