const User = require("../models/User");

exports.signinAction = async (request, response) => {
  const auth = User.authenticate();
  const { email, password } = request.body;
  auth(email, password, (error, result) => {
    if (!result) {
      return response.json(error);
    }
    request.login(result, () => {});
    return response.status(200).json(result);
  });
};
exports.signupAction = async (request, response) => {
  try {
    const newUser = await User.register(
      new User(request.body),
      request.body.password
    );
    return response.status(200).json(newUser);
  } catch (error) {
    return response.json(error);
  }
};

exports.updateAction = (request, response) => {};

exports.logout = (request, response) => {
  request.logout();
};