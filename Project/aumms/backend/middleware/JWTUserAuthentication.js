const { ResponseModel } = require("../models/ResponseModel");
const jwt = require("jsonwebtoken");
function JWTUserAuthentication(request, response, next) {
  const JWTToken = request.headers["x-access-token"];
  if (!JWTToken) {
    response.json(new ResponseModel("", -1, "Unauthorized Token").toObject());
  } else {
    jwt.verify(JWTToken, process.env.JWT_KEY, (error, decoded) => {
      if (error) {
        response.json(
          new ResponseModel("", -1, "Unauthorized Token").toObject()
        );
      } else {
        request.UserId = decoded.UserId;
        next();
      }
    });
  }
}
module.exports = JWTUserAuthentication;
