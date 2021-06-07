const extractApiErrors = (err) => {
  if (!err) return;
  return {
    ...(typeof err.response?.data.message === "string"
      ? { __global: err.response?.data.message }
      : err.response?.data.message),
    __statusCode: err.response?.data.statusCode || 500,
    __stack: err.response?.data.stack,
  };
};

export default extractApiErrors;
