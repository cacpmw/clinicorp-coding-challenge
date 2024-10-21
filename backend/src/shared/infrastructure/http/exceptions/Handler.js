const RequestError = require("./RequestError.js");

module.exports = (error, _request, response, _next) => {
  console.error(error.stack);
  if (error instanceof RequestError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal Server Error" });
};
