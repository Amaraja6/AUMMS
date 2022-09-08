const Mongoose = require("mongoose");
const SignUpModel = new Mongoose.Schema({
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
  Password: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = Mongoose.model("user", SignUpModel);
