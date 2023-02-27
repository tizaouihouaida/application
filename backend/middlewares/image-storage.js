const multer = require("multer");

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "static/images");
    },
    filename: (req, file, cb) => {
		let nameWithoutExtension = file.originalname.toLocaleLowerCase().split(".");
		nameWithoutExtension.pop();
		nameWithoutExtension = nameWithoutExtension.join(".");
        const name = nameWithoutExtension.split(" ").join("-");
        console.log(name);
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    },
});

module.exports = storage;