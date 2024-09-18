const User = require('../models/User');

exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (req.user.role !== 'admin' && !((req.user.role === 'teacher' || req.user.role === 'manager') && role === 'student')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (req.user.role !== 'admin' && !((req.user.role === 'teacher' || req.user.role === 'manager') && role === 'student')) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  try {
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
