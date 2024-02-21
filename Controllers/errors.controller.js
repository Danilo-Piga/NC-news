exports.errorHandler = (err, req, res, next) => {
    let status;
    let message;
  
    status = err.status || 500;
    message = err.message || 'Internal server error';
  
    if (err.status === 404) {
      status = 404;
      message = err.message || 'Article not found';
    } else if (err.name === 'ValidationError') {
      status = 400; 
      message = err.message || 'Validation error';
    } else if (err.name === 'UnauthorizedError') {
      status = 401; 
      message = err.message || 'Unauthorized';
    } else if (err.name === 'ForbiddenError') {
      status = 403; 
      message = err.message || 'Forbidden';
    } else if (err.name === 'ConflictError') {
      status = 409; 
      message = err.message || 'Conflict';
    }
    
    if (status === 500) {
      console.error(err);
    }
  
    res.status(status).json({ message });
  };