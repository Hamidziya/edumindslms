const Course = require("../models/Course");
const coursesection = require("../models/courseSection");

const Detail = require("../models/courseSectionFolder");
const commonjs = require("../config/common");

const fs = require("fs");
const path = require("path");

exports.createCourse = [
  commonjs.single("image"),
  async (req, res) => {
    const toSave = JSON.parse(req.body.data);
    try {
      if (req.file) {
        toSave.courseImage = req.file.filename;
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
  commonjs.single("image"),
  async (req, res) => {
    try {
      const toUpdate = JSON.parse(req.body.data);
      const courseId = toUpdate.courseId;

      const course = await Course.findByPk(courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      if (req.file) {
        toUpdate.courseImage = req.file.filename;
      }
      await course.update(toUpdate);

      res.status(200).json({
        message: "Course updated successfully",
        status: "success",
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
      return res.status(404).json({ message: "No active Course found" });
    }

    res.status(200).json({
      message: "Course List",
      status: "success",
      data: courses,
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

// course section apis

exports.createCourseSection = async (req, res) => {
  const toSave = req.body.data;

  try {
    const newCourse = await coursesection.create(toSave);

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

    res.status(200).json({ message: "Section Updated", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourseSection = async (req, res) => {
  const courseSectionId = req.body.courseSectionId;

  try {
    const course = await coursesection.findByPk(courseSectionId);

    if (!course) {
      return res.status(404).json({ message: "Course section not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "section Deleted", status: "success" });
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

//course section folder apis

exports.saveCourseSectionFolder = [
  commonjs.array("files"),
  async (req, res) => {
    try {
      const toSave = JSON.parse(req.body.data);

      if (req.files && req.files.length > 0) {
        toSave.files = req.files.map((file) => ({
          filename: file.filename,
        }));
      }

      // let toUpdate = {}
      // if (req.files.length<=5){
      //   toUpdate.course = new
      // }

      const newFolder = await Detail.create(toSave);

      res.status(201).json({
        message: "Course section folder added successfully",
        status: "success",
        data: newFolder,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to save course section folder",
        error: err.message,
      });
    }
  },
];

exports.updateCourseSectionFolder = [
  commonjs.array("files"),
  async (req, res) => {
    try {
      const toUpdate = JSON.parse(req.body.data);

      const folder = await Detail.findByPk(toUpdate.folderId);

      if (!folder) {
        return res.status(404).json({
          status: "error",
          message: "Folder not found",
        });
      }

      if (req.files && req.files.length > 0) {
        let existingFiles = folder.files || [];
        const newFiles = req.files.map((file) => ({
          filename: file.filename,
        }));

        existingFiles = [
          ...existingFiles,
          ...newFiles.filter(
            (newFile) =>
              !existingFiles.some(
                (existingFile) => existingFile.filename === newFile.filename
              )
          ),
        ];
        folder.files = existingFiles;
      }

      if (toUpdate.links && toUpdate.links.length > 0) {
        folder.links = toUpdate.links;
      }

      if (toUpdate.title) {
        folder.title = toUpdate.title;
      }

      if (toUpdate.description) {
        folder.description = toUpdate.description;
      }

      await folder.save();

      res.status(200).json({
        message: "Course section folder updated successfully",
        status: "success",
        data: folder,
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Failed to update course section folder",
        error: err.message,
      });
    }
  },
];

exports.getCourseSectionFolderList = async (req, res) => {
  const { courseSectionId } = req.body;

  try {
    if (!courseSectionId) {
      return res.status(400).json({
        status: "error",
        message: "courseSectionId is required",
      });
    }

    const folder = await Detail.findAll({
      where: { isDelete: false, courseSectionId: courseSectionId },
    });

    if (!folder) {
      return res.status(404).json({
        status: "error",
        message: "Course section folder not found",
      });
    }

    res.status(200).json({
      message: "Course section folder retrieved successfully",
      status: "success",
      data: folder,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to retrieve course section folder",
      error: err.message,
    });
  }
};

exports.deleteCourseSectionFolderList = async (req, res) => {
  const folderId = req.body.folderId;

  try {
    const course = await Detail.findByPk(folderId);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course section folder not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "folder Deleted", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourseSectionFolderListNew = async (req, res) => {
  const folderId = req.body.folderId;

  try {
    const course = await Detail.findByPk(folderId);

    if (!course) {
      return res
        .status(404)
        .json({ message: "Course section folder not found" });
    }

    await course.update({
      isDelete: true,
    });

    res.status(200).json({ message: "folder Deleted", status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
