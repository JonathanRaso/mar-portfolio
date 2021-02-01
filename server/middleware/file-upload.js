const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid')

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: 500000,

  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
      // Extract the right extension here, dynamically
      const ext =  MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + '.' + ext);
    }
  })

});

module.exports = fileUpload;