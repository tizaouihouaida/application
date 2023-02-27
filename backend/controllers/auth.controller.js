const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
const userController = require('../controllers/user.controller');

async function login(req, res, next) {
  try {
    let { email, password } = req.body;
    const user = await userController.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "invalid_email_password" });
    }

    if (!user.isEnabled) {
      return res.status(403).json({ message: "account_disabled" });
    }

    let isMatch = user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid_email_password" });
    }

    let permissionskey = [];
    for (const permission of user.Role.Permissions) {
      permissionskey.push(permission.key);
    }

    let jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.secretKey,
      { expiresIn: 86400 }
    );
    return res.status(200).json({
      token: jwtToken,
      expiresIn: 86400,
      permissions: permissionskey,
    });
  } catch (error) {
    res.status(500).json({ message: "an error occurred please try again!" });
  }
}

module.exports = { login };
