const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    const { title, description, price } = req.body;
  
    try {
      // Create a new course
      const newCourse = await Course.create({
        title,
        description,
        //duration,
        price, 
      });
  
      res.status(201).json(newCourse);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

exports.updateCourse = async (req, res) => {
  const { username, email, role, isDelete, isPermission } = req.body; 
  const userId = req.body.id;  

  try {
    const user = await Course.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({
      username: username,
      email: email || user.email,
      role: role || user.role,
      //companyName: "Eduminds"
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

