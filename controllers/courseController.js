const Course = require("../models/Course");
const coursesection = require("../models/courseSection");

const Detail = require("../models/sectionDetail");

exports.createCourse = async (req, res) => {
  const toSave = req.body;

  try {
    const newCourse = await Course.create(toSave);

    res.status(201).json({
      message: "Course updated successfully",
      status: "success",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  const toUpdate = req.body.data;
  const courseId = toUpdate.courseId;

  try {
    const course = await Course.findByPk(courseId);

    if (!user) {
      return res.status(404).json({ message: "course not found" });
    }

    await course.update(toUpdate);

    res.status(200).json({
      message: "Course updated successfully",
      status: "success",
      data: course,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  const courseId = req.body.courseId;

  try {
    const course = await Course.findByPk(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({
      message: "Course updated successfully",
      status: "success",
      data: course,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseList = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res
      .status(200)
      .json({ message: "Course List", status: "success", data: courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseListDummy = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseListDummy1 = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isDelete: false },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// course section apis

exports.createCourseSection = async (req, res) => {
  const toSave = req.body.data;

  try {
    const newCourse = await coursesection.create(toSave);

    //res.status(201).json(newCourse);
    return res
      .status(200)
      .json({ message: "section created", status: "success", data: newCourse });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourseSection = async (req, res) => {
  const toUpdate = req.body.data;
  const courseSectionId = toUpdate.courseSectionId;

  try {
    const courseSection = await coursesection.findByPk(courseSectionId);

    if (!courseSection) {
      return res.status(404).json({ message: "User not found" });
    }

    await courseSection.update(toUpdate);

    res.status(200).json({ message: "section updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourseSection = async (req, res) => {
  const courseSectionId = req.body.courseId;

  try {
    const course = await coursesection.findByPk(courseSectionId);

    if (!course) {
      return res.status(404).json({ message: "Course section not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "Section updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseSectionList = async (req, res) => {
  let courseid = req.body.courseId;
  try {
    const courses = await coursesection.findAll({
      where: { isDelete: false, courseId: courseid },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json({
      message: "Course Section List",
      status: "success",
      data: courses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourseSectionDetail = async (req, res) => {
  const toSave = req.body.data;

  try {
    const newCourse = await Detail.create(toSave);

    //res.status(201).json(newCourse);
    return res.status(200).json({
      message: "section detail created",
      status: "success",
      data: newCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getActiveCourseSectionDetailList = async (req, res) => {
  let courseSectionId = req.body.courseId;
  try {
    const courses = await Detail.findAll({
      where: { isDelete: false, courseSectionId: courseSectionId },
    });

    if (courses.length === 0) {
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json({
      message: "Course Section Detail List",
      status: "success",
      data: courses,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCourseSectionDetail = async (req, res) => {
  const toUpdate = req.body.data;
  const detailId = toUpdate.detailId;

  try {
    const courseSection = await coursesection.findByPk(detailId);

    if (!courseSection) {
      return res.status(404).json({ message: "User not found" });
    }

    await courseSection.update(toUpdate);

    res.status(200).json({ message: "section updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourseSection = async (req, res) => {
  const courseSectionId = req.body.courseId;

  try {
    const course = await coursesection.findByPk(courseSectionId);

    if (!course) {
      return res.status(404).json({ message: "Course section not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "Section updated successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
