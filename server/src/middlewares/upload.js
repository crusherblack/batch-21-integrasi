const multer = require("multer");

exports.uploadFile = (imageFile, videoFile) => {
  //initialisasi multer diskstorage
  //menentukan destionation file diupload
  //menentukan nama file (rename agar tidak ada nama file ganda)
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); //lokasih penyimpan file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); //rename nama file by date now + nama original
    },
  });

  //function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    if (file.fieldname === videoFile) {
      if (!file.originalname.match(/\.(mp4|mkv)$/)) {
        req.fileValidationError = {
          message: "Only Video files are allowed!",
        };
        return cb(new Error("Only Video files are allowed!"), false);
      }
    }
    cb(null, true);
  };

  const sizeInMB = 100;
  const maxSize = sizeInMB * 1000 * 1000; //Maximum file size i MB

  //eksekusi upload multer dan tentukan disk storage, validation dan maxfile size
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: imageFile,
      maxCount: 1,
    },
    {
      name: videoFile,
      maxCount: 1,
    },
  ]); //fields digunakan karena file yang diupload lebih dari 1 fields

  //middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      //munculkan error jika validasi gagal
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      //munculkan error jika file tidak disediakan
      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select files to upload",
        });

      //munculkan error jika melebihi max size
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10MB",
          });
        }
        return res.status(400).send(err);
      }

      //jika oke dan aman lanjut ke controller
      //akses nnti pake req.files
      return next();
    });
  };
};

exports.uploadSingle = (uploadedFile) => {
  //initialisasi multer diskstorage
  //menentukan destionation file diupload
  //menentukan nama file (rename agar tidak ada nama file ganda)
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); //lokasih penyimpan file
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); //rename nama file by date now + nama original
    },
  });

  //function untuk filter file berdasarkan type
  const fileFilter = function (req, file, cb) {
    if (file.fieldname === uploadedFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image files are allowed!",
        };
        return cb(new Error("Only image files are allowed!"), false);
      }
    }

    cb(null, true);
  };

  const sizeInMB = 100;
  const maxSize = sizeInMB * 1000 * 1000; //Maximum file size i MB

  //eksekusi upload multer dan tentukan disk storage, validation dan maxfile size
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: uploadedFile,
      maxCount: 1,
    },
  ]); //fields digunakan karena file yang diupload lebih dari 1 fields

  //middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      //munculkan error jika validasi gagal
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      //munculkan error jika file tidak disediakan
      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select files to upload",
        });

      //munculkan error jika melebihi max size
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10MB",
          });
        }
        return res.status(400).send(err);
      }

      //jika oke dan aman lanjut ke controller
      //akses nnti pake req.files
      return next();
    });
  };
};
