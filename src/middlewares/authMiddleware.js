exports.isLogged = (request, response, next) => {
  if (!request.isAuthenticated()) {
    return response.status(401).json(["Unauthorized"]);
  }
  next();
};
