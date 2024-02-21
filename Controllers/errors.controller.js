exports.errorHandler = (err, req, res, next) => {
    let status;
    let message;

    if (err.status === 404) {
        status = 404;
        message = err.message || 'Resource not found';
    } else {
        status = err.status || 500;
        message = err.message || 'Internal server error';
    }

    res.status(status).json({ message });
};