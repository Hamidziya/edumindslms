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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginDummy = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
