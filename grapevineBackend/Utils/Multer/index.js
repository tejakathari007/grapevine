const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { S3 } = require("../Aws");
const { resuableFalseError } = require("../../CustomResponse/index");
const sharp = require("sharp");
// const storage = multer.diskStorage({
//   destination: "./Assets/",
//   filename: function (req, file, cb) {
//     console.log(file);
//     cb(null, req.user_uuid + "/" + uuidv4() + path.extname(file.originalname));
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000000000 },
}).array("image");

// if the directory doesn't exist in the asset folder to upload file, create one
const maintainDirectory = async (req, res, next) => {
  if (!fs.existsSync("./Assets/" + req.user_uuid)) {
    fs.mkdirSync("./Assets/" + req.user_uuid, { recursive: true });
  }
  next();
};

const uploadFiles = async (req, res, next) => {
  try {
    await maintainDirectory(req, res, async () => {
      upload(req, res, async () => {
        let files = await Promise.all(
          req.files.map(async (file) => {
            const resizedFile = await sharp(file.buffer)
              .resize({
                width: 128,
                height: 128,
              })
              .toBuffer();
            const result = await S3.uploadFile({
              buffer: resizedFile,
              filename:
                req.user_uuid +
                "/" +
                uuidv4() +
                path.extname(file.originalname),
            });
            return { filename: result.Key, originalname: file.originalname };
          })
        );
        req.files = files;
        next();
      });
    });
  } catch (err) {
    res.json(resuableFalseError("Something Went Wrong"));
  }
};

module.exports = { uploadFiles };
