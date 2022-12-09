const express = require("express");
const Controller = require("../Controllers");
const Router = express.Router();

//User Routes
Router.post("/login", Controller.User.login);
Router.post("/signup", Controller.User.signup);
Router.post("/forgotPassword", Controller.User.forgotPassword);

module.exports = Router;
