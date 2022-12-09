const multer = require("multer");
const path = require("path");
//multerSetup
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, "" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = { upload };
