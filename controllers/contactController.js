const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const contacts = require("../models/contacts");
const Detail = require("../models/courseSectionFolder");

require("dotenv").config();

exports.saveContact = async (req, res) => {
  const toSave = req.body;
  try {
    // const seodata = await seomaildata.findAll({
    //   where: {
    //     email: toSave.email,
    //   },
    // });
    // if (seodata.length > 0) {
    //   return res.status(201).json({ message: "User Already Exist" });
    // }
    const contactdata = await contacts.create(toSave);
    res.status(200).json({
      message: "data saved successfully",
      status: "success",
      data: contactdata,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.saveEmailWithName = async (req, res) => {
//   const toSave = req.body;
//   try {
//     const seodata = await seomaildata.findAll({
//       where: {
//         email: toSave.email,
//       },
//     });
//     if (seodata.length > 0) {
//       return res.status(201).json({ message: "User Already Exist" });
//     }
//     const user = await seomaildata.create(toSave);
//     res.status(200).json({
//       message: "data saved successfully",
//       status: "success",
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.listOfTheContacts = async (req, res) => {
  try {
    const contactdata = await contacts.findAll({
      where: {
        isDelete: false,
        //isRegistration: true,
      },
    });
    if (contactdata.length == 0) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({
      message: "contact List",
      status: "success",
      data: contactdata,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
