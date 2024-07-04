// testUpload.js
const fs = require("fs");
const S3UploadUtils = require("../src/utils/s3BucketUtils");

const imagePath = "./lena_devil.webp";
const imageBuffer = fs.readFileSync(imagePath);

const file = {
  buffer: imageBuffer,
  originalname: "lena_devil.webp",
};

S3UploadUtils.uploadImageToS3(file.buffer, file.originalname)
  .then((s3ObjectUrl) => {
    console.log("Image uploaded to S3:", s3ObjectUrl);
  })
  .catch((error) => {
    console.error("Error uploading image to S3:", error);
  });
