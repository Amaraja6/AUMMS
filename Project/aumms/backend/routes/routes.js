const express = require("express");
const bcrypt = require("bcryptjs");
const { models, model, Mongoose, default: mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");
const MentorModel = require("../models/MentorModel");
const router = express.Router();
router.post("/signup", async (request, response) => {
  console.log("New Request!");

  const hashedPassword = await bcrypt.hash(request.body.Password, 8);
  const NewUser = new UserModel({
    FirstName: request.body.FirstName,
    LastName: request.body.LastName,
    Email: request.body.Email,
    Password: hashedPassword,
    // Date has a default attribute so no need to set the current Date/Time
  });
  NewUser.save()
    .then((data) => response.json(data))
    .catch((error) => response.json(error));
});
router.post("/login", (request, response) => {
  console.log("New Request!");
  let LoginEmail = request.body.Email;
  let LoginPassword = request.body.Password;
  if (LoginEmail == "" || LoginPassword == "") {
    response.status(401).send(false);
  } else {
    UserModel.findOne({ Email: LoginEmail })
      .select("Password -_id")
      .then((data) => {
        console.log(data.Password, LoginPassword);
        bcrypt.compare(LoginPassword, data.Password, (err, result) => {
          if (result) {
            response.send(true);
          } else {
            response.send(false);
          }
        });
      });
  }
});

router.get("/mentors", async (request, response) => {
  let mentorList = [];
  for (field in request.body) {
    await MentorModel.find({ [field]: request.body[field] }, { _id: 0 })
      .then((profiles) => {
        mentorList.push(...profiles);
      })
      .catch((error) => response.json(error));
  }
  console.log(mentorList);
  response.json(mentorList);
});

module.exports = router;
