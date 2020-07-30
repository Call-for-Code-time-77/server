exports.notFound = (request, response, next) => {
  return response.status(404).json(["Not found"]);
};
