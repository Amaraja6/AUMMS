const Mongoose = require("mongoose");
const LoginModel = new Mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});
module.exports = Mongoose.model("Login", LoginModel);
