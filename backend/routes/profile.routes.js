const router = require("express").Router();
const multer = require("multer");
const profileController = require("../controllers/profile.controller");
const storage = require("../middlewares/image-storage");
const isAuthenticatedMiddleware = require("../middlewares/is-authenticated.middleware");

router.get("/", isAuthenticatedMiddleware, profileController.getProfile);
router.put(
  "/",
  isAuthenticatedMiddleware,
  multer({ storage: storage }).single("image"),
  profileController.updateProfile
);

module.exports = router;
