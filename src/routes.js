const express = require("express");
const userController = require("./controllers/userController");

const authMiddleware = require("./middlewares/authMiddleware");

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "home" });
});

routes.post("/users/signin", userController.signinAction);
routes.post("/users/signup", userController.signupAction);
routes.put("/users/update", userController.updateAction);
routes.get("/users/logout", userController.logout);

routes.get(
  "/users/patient",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  (request, response) => {
    return response.json({ message: "paciente" });
  }
);

routes.get(
  "/users/crp",
  authMiddleware.isLogged,
  authMiddleware.isCRP,
  (request, response) => {
    return response.json({ message: "psicologo" });
  }
);

module.exports = routes;
