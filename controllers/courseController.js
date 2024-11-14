const Course = require("../models/Course");
const coursesection = require("../models/courseSection");

const Detail = require("../models/sectionDetail");

const uploadFolder = "./uploads/";

const fs = require("fs");
const path = require("path");
// Check if the uploads folder exists; if not, create it
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const multer = require("multer");

// Configure multer storage with a prefix "edu" for filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder); // Save in 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "edu-" + uniqueSuffix + path.extname(file.originalname)); // Prefix with 'edu'
  },
});

const upload = multer({ storage: storage });

exports.createCourse = [
  upload.single("image"), // 'courseImage' is the key for the file in the form-data
  async (req, res) => {
    const toSave = JSON.parse(req.body.data); // Parse JSON data from the request body
    try {
      // Save only the file name in the 'toSave' data
      if (req.file) {
        toSave.courseImage = req.file.filename; // Save only filename in toSave
      }

      const newCourse = await Course.create(toSave);

      res.status(201).json({
        message: "Course added successfully",
        status: "success",
        data: newCourse,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

exports.updateCourse = [
  upload.single("image"), // Handling single file upload under 'image'
  async (req, res) => {
    try {
      const toUpdate = JSON.parse(req.body.data); // Parsing the 'data' field as JSON
      const courseId = toUpdate.courseId;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      // If an image file is uploaded, update the course with the image buffer and MIME type
      if (req.file) {
        toUpdate.courseImage = req.file.buffer; // Save image buffer
        toUpdate.courseImageType = req.file.mimetype; // Save MIME type
      }

      // Update the course in the database
      await course.update(toUpdate);

      res.status(200).json({
        message: "Course updated successfully",
        status: "success",
        //data: course,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
];

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
      return res.status(404).json({ message: "No active course found" });
    }

    const coursesWithBase64Files = courses.map((course) => {
      const courseData = course.toJSON();

      // Convert courseImage BLOB to Base64 with MIME type prefix
      if (courseData.courseImage && courseData.courseImageType) {
        courseData.courseImage = `data:${
          courseData.courseImageType
        };base64,${Buffer.from(courseData.courseImage).toString("base64")}`;
      }

      return courseData;
    });

    res.status(200).json({
      message: "Course List",
      status: "success",
      data: coursesWithBase64Files,
    });
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
