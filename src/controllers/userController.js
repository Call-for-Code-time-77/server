const User = require("../models/User");

exports.signinAction = async (request, response) => {
  try {
    const auth = User.authenticate();
    const { email, password } = request.body;
    auth(email, password, (error, result) => {
      if (!result) {
        return response.status(404).json(["Not found"]);
      }
      request.login(result, () => {});
      const { salt, ...filter } = result.toObject();
      return response.status(200).json(filter);
    });
  } catch (error) {
    return response.json(error);
  }
};
exports.signupAction = async (request, response) => {
  try {
    const newUser = await User.register(
      new User(request.body),
      request.body.password
    );
    const { salt, ...filter } = newUser.toObject();
    return response.status(201).json(filter);
  } catch (error) {
    return response.json(error);
  }
};

exports.updateAction = (request, response) => {};

exports.logout = (request, response) => {
  request.logout();
  return response.json({ message: "logged out" });
};
