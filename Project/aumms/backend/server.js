const express = require("express");
const app = express();

const Mongoose = require("mongoose");

const Router = require("./routes/routes");
const DotEnv = require("dotenv");
const Cors = require("cors");

DotEnv.config();
Mongoose.connect(process.env.DATABASE_AUTH_URL, () => {
  console.log("Database connected!");
});

app.use(express.json());
app.use(Cors());
app.use("/app", Router);
app.listen(4000, () => console.log("Server is running!"));
