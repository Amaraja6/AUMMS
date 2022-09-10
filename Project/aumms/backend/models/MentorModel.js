const Mongoose = require("mongoose");
const MentorModel = new Mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Knowledge1: {
      type: String,
      required: true,
    },
    Knowledge2: {
      type: String,
      required: true,
    },
    Knowledge3: {
      type: String,
    },
    Knowledge4: {
      type: String,
    },
    GraduationYear: {
      type: Date,
      required: true,
    },
    Degree: {
      type: String,
      required: true,
    },
    Department: {
      type: String,
      required: true,
    },
    Campus: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);
module.exports = Mongoose.model("mentor", MentorModel);
