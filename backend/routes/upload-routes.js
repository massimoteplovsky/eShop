const path = require("path");
const {Router} = require("express");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const {auth, admin} = require("../middlewares");
const {HttpCode} = require("../consts");
const MAX_FILE_SIZE = 100 * 1024 * 1024;

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // cb(null, 'frontend/public/images');
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// function checkFileType (file, cb) {
//   console.log(file)
//   const filetype = /jpg|png|jpeg/;
//   const extname = filetype.test(path.extname(file.originalname).toLocaleLowerCase());
//   const mimetype = filetype.test(file.mimetype);

//   console.log(extname, mimetype)

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images"));
//   }
// }

// let upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
//   limits: {fileSize: MAX_FILE_SIZE}
// });

const uploadRouter = new Router();
// @desc   Upload file
// @route  POST /api/uploads
// @access Public
uploadRouter.post("/", (req, res, next) => {
  if (!req.files) {
    return res.status(400).send("Error");
  }
  const {image} = req.files

  const fileName = `${Date.now()}-${image.name}`;
  console.log(fileName)
  image.mv(`frontend/public/uploads/${fileName}`, (err) => {
    if (err) {
      console.log(err);
    }
    return res.send(`/uploads/${fileName}`);
  })


   // return res.send(`/${req.file.path}`);



});

module.exports = uploadRouter;
