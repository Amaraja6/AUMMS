const express = require("express");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const JWTUserAuthentication = require("../middleware/JWTUserAuthentication");
const { models, model, Mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");
const MentorModel = require("../models/MentorModel");
const ObjectId = require("mongodb").ObjectId;
const { ResponseModel } = require("../models/ResponseModel");
const router = express.Router();

router.post("/signup", async (request, response) => {
  console.log("New Signup Request!");
  console.log(request.body.Password, request.body.RetypePassword);
  let valid = [
    validator.isEmail(request.body.Email),
    validator.isLength(request.body.FirstName, { min: 2, max: 50 }),
    validator.isLength(request.body.LastName, { min: 2, max: 50 }),
    validator.isStrongPassword(request.body.Password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    }),
    validator.equals(request.body.Password, request.body.RetypePassword),
  ];
  console.log(valid.indexOf(false));
  if (valid.indexOf(false) != -1) {
    response.json(
      new ResponseModel("", -1, "Error, failed to register user!").toObject()
    );
    return;
  }

  UserModel.count({
    Email: request.body.Email,
  }).then((count) => {
    if (count > 0) {
      response.json(
        new ResponseModel("User already registered", 0, "").toObject()
      );
    } else {
      bcrypt.hash(request.body.Password, 8).then((hashedPassword) => {
        console.log(hashedPassword);
        const NewUser = new UserModel({
          FirstName: request.body.FirstName,
          LastName: request.body.LastName,
          Email: request.body.Email,
          Password: String(hashedPassword),
          //Date has a default attribute so no need to set the current Date/Time
        });
        NewUser.save()
          .then((result) => {
            response.json(
              new ResponseModel("Successfully registered", 1, "").toObject()
            );
          })
          .then(() => {})

          .catch((error) => {
            console.log(error);
            response.json(
              new ResponseModel(
                "",
                -1,
                "Error, failed to register user!"
              ).toObject()
            );
          });
      });
    }
  });
});

router.post("/login", (request, response) => {
  let LoginEmail = request.body.Email;
  let LoginPassword = request.body.Password;
  if (LoginEmail == "" || LoginPassword == "") {
    response.json(new ResponseModel("", -1, "Invalid credentials").toObject());
  } else {
    UserModel.count({ Email: LoginEmail }).then((count) => {
      if (count == 0) {
        response.json(
          new ResponseModel("", -1, "Account not registered").toObject()
        );
      } else {
        UserModel.findOne({ Email: LoginEmail })
          .select("Password")
          .then((data) => {
            bcrypt.compare(LoginPassword, data.Password, (error, result) => {
              if (result) {
                const UserId = data._id;
                const JWTToken = jwt.sign({ UserId }, process.env.JWT_KEY, {
                  expiresIn: "300s",
                });
                let ResponseObject = new ResponseModel(
                  "Valid user",
                  1,
                  ""
                ).toObject();
                ResponseObject["token"] = JWTToken;
                response.json(ResponseObject);
              } else {
                response.json(
                  new ResponseModel("Invalid credentials", -1, "").toObject()
                );
              }
            });
          })
          .catch((error) => {
            response.json(
              new ResponseModel("", -1, "Error logging in").toObject()
            );
          });
      }
    });
  }
});

router.post("/search", (request, response) => {
  console.log("New search request");
  if (validator.isEmpty(request.body.Keyword)) {
    let empty = [];
    response.json(empty);
    return;
  }
  let mentorList = [];
  switch (request.body.Domain) {
    case "Knowledge": {
      MentorModel.find(
        {
          $or: [
            { Knowledge1: new RegExp(request.body.Keyword, "i") },
            { Knowledge2: new RegExp(request.body.Keyword, "i") },
            { Knowledge3: new RegExp(request.body.Keyword, "i") },
            { Knowledge4: new RegExp(request.body.Keyword, "i") },
          ],
        },
        { _id: 0 }
      )
        .then((profiles) => {
          mentorList.push(...profiles);
        })
        .then(() => {
          response.json(mentorList);
          return mentorList;
        })
        .then((mentorList) => {
          console.log(mentorList);
        })
        .catch((error) => response.json(error));
      break;
    }
    case "Department": {
      console.log("Hey");
      MentorModel.find(
        {
          $or: [{ Department: new RegExp(request.body.Keyword, "i") }],
        },
        { _id: 0 }
      )
        .then((profiles) => {
          mentorList.push(...profiles);
        })
        .then(() => {
          response.json(mentorList);
          return mentorList;
        })
        .then((mentorList) => {
          console.log(mentorList);
        })
        .catch((error) => response.json(error));
      break;
    }
  }
});

router.get("/authorize", JWTUserAuthentication, (request, response) => {
  const UserId = request.UserId;
  console.log(UserId);

  UserModel.findById(ObjectId(UserId))
    .then((data) => {
      if (data != null) {
        response.json(new ResponseModel("Token Authorized", 1, "").toObject());
      } else {
        response.json(
          new ResponseModel("", -1, "Unauthorized Token").toObject()
        );
      }
      console.log(data);
    })
    .catch((error) => {
      response.json(new ResponseModel("", -1, "Unauthorized Token").toObject());
    });
  return;
});

// router.get("/deauthorize", (request, response) => {
//   jwt.
//   return;
// });
module.exports = router;
