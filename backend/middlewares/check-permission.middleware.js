const jwt = require("jsonwebtoken");
const userController = require('../controllers/user.controller');
module.exports =  (permission) => {
    return async (req, res, next) => {
        try {
            const token = req?.headers?.authorization?.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.secretKey);
            const user = await userController.findUserByEmail(decodedToken.email);
            if (!user) {
                return res.status(401).json({ message: "unauthorized" });
            }
            let permissions = [];
            for (const permission of user?.Role?.Permissions) {
                permissions.push(permission.key);
            }
            if(permissions.includes(permission)) {
                next();
            } else {
                return res.status(401).json({ message: "unauthorized" });
            }
          } catch (error) {
            return res.status(401).json({ message: "auth_failed" });
          }
    }
}
