const { Router } = require("express");
// require("dotenv").config();
const userController = Router();
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/User.model");
// const { Authentication } = require("../Middlewares/Authentication");

// user sign up --------------------------------------------
// --------------------------------------------------------------
userController.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  const existing_user = await userModel.findOne({ email });

  if (existing_user) {
    res.send({ msg: "user already exist" });
    return;
  }

  const new_user = new userModel({
    email,
    password,
    name,
  });

  await new_user.save();
  res.send({ msg: "signup succesfull.." });
});





module.exports = {
    userController,
  };