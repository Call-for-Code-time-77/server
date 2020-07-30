const express = require("express");
const userController = require("./controllers/userController");

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "home" });
});

routes.post("/users/signin", userController.signinAction);
routes.post("/users/signup", userController.signupAction);
routes.get("/users/logout", userController.logout);

module.exports = routes;
