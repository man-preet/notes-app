const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "SECRETKEYTOMAKETOKEN"); // Replace with your own secret key

      // Find the user by ID in the database
      const user = await User.findById(decodedToken.id);

      if (!user) {
        res.status(401);
        throw new Error("Not authorized! User not found.");
      }

      // Store the authenticated user in the request object
      
      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized! Invalid token.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized! No token.");
  }
};

module.exports = {protect};
