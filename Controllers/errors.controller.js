exports.errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal server error";

  switch (err.name) {
    case "ValidationError":
      status = 400;
      message = err.message || "Validation error";
      break;
    case "UnauthorizedError":
      status = 401;
      message = err.message || "Unauthorized";
      break;
    case "ForbiddenError":
      status = 403;
      message = err.message || "Forbidden";
      break;
    case "ConflictError":
      status = 409;
      message = err.message || "Conflict";
      break;
    case "MissingParameterError":
      status = 400;
      message = err.message;
      break;
    default:
      if (err.code === "23503") {
        status = 404;
        message = err.message || "Article not found";
      }
  }

  res.status(status).json({ message });
};
