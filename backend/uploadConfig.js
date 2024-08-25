const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

// Configure the S3 client to point to LocalStack
const s3 = new S3Client({
  region: 'us-east-1',
  forcePathStyle: true,
  endpoint: 'http://localhost:4566', // LocalStack S3 endpoint
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test',
  },
});

// Configure multer to use S3 for storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME, // Bucket name from .env file
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname); // Unique file name
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only images are allowed!'), false);
    }
  },
});

module.exports = upload;

