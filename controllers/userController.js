const User = require('../models/User');
const Course = require('../models/Course');


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
  const toUpdate = req.body; 
  const userId = req.body.userid;  

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update(toUpdate);

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserCourse = async (req, res) => {
  try {
    const userId = req.body.userId;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const courseIds = user.courseIds.map(course => course.courseId);

    const courses = await Course.findAll({
      where: {
        courseId: courseIds
      }
    });

    const courseDetails = courses.map(course => ({
      courseId: course.courseId,
      title: course.title,
      description: course.description,
      price: course.price
    }));

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      courses: courseDetails
    });

  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



