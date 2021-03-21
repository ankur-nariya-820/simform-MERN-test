const sendError = (res, statusCode, errorCode) => {
  res.status(statusCode || 500).send({
    success: false,
    errorCode: errorCode || 5001
  });
}

exports.sendError = sendError;