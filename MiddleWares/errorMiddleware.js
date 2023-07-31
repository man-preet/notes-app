
const errorHandler = (err, req, res, next) => {
    // Set the response status to the error status or default to 500 (Internal Server Error)
    res.status(err.status || 500);
  
    // Send the error message as the response
    res.json({
      error: {
        message: err.message,
      },
    });
  };
  
module.exports = {werrorHandler}