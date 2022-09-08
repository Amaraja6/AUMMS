const express = require("express");
const { models, model } = require("mongoose");
const SignUpModel = require("../models/SignUpModel");
const router = express.Router();
router.post("/signup", (request, response) => {
  console.log("New Request!");
  const NewUser = new SignUpModel({
    FirstName: request.body.FirstName,
    LastName: request.body.LastName,
    Email: request.body.Email,
    Password: request.body.Password,
    // Date has a default attribute so no need to set the current Date/Time
  });
  NewUser.save()
    .then((data) => response.json(data))
    .catch((error) => response.json(error));
});
module.exports = router;
