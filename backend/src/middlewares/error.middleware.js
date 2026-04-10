export const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || "interal Server Error",
  };

  return res.status(error.statusCode).json({
    success: false,
    ...error,
  });
};
