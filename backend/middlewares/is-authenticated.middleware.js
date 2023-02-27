const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.secretKey);
    req.user = {
      email: decodedToken.email,
      id: decodedToken.id,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "auth_failed" });
  }
};
