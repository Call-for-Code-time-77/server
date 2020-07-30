exports.isLogged = (request, response, next) => {
  if (!request.isAuthenticated()) {
    return response.status(401).json(["Unauthorized"]);
  }
  next();
};

exports.isCRP = (request, response, next) => {
  if (request.user.crp === undefined) {
    return response.status(401).json(["Unauthorized"]);
  }
  next();
};

exports.isPatient = (request, response, next) => {
  if (!(request.user.crp === undefined)) {
    return response.status(401).json(["Unauthorized"]);
  }
  next();
};
