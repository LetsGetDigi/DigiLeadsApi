const multer = require("multer");

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, __basedir)
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + '-' + Date.now() + ".csv",
    )
  },
})

var uploadFile = multer({ storage: storage, fileFilter: csvFilter });
module.exports = uploadFile;