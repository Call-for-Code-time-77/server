const express = require("express");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const therapyController = require("./controllers/therapyController");
const watsonController = require("./controllers/watsonController");

const authMiddleware = require("./middlewares/authMiddleware");

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "home" });
});

routes.post("/users/signin", userController.signinAction);
routes.post("/users/signup", userController.signupAction);
routes.put("/users/update", userController.updateAction);
routes.get("/users/logout", userController.logout);

routes.post(
  "/posts/add",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  postController.add,
  watsonController.add
);

routes.get(
  "/watson/view/:id",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  watsonController.view
);
routes.get(
  "/watson/list",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  watsonController.list
);

routes.get(
  "/posts/view/:id",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  postController.view
);
// routes.put(
//   "/posts/edit/:id",
//   authMiddleware.isLogged,
//   authMiddleware.isPatient,
//   postController.edit
// );
routes.get(
  "/posts/list",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  postController.list
);

routes.post(
  "/therapies/add",
  authMiddleware.isLogged,
  authMiddleware.isPatient,
  therapyController.add
);

routes.get(
  "/therapies/view/:id",
  authMiddleware.isLogged,
  authMiddleware.isCRP,
  therapyController.view
);
routes.get(
  "/therapies/list",
  authMiddleware.isLogged,
  authMiddleware.isCRP,
  therapyController.list
);

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
