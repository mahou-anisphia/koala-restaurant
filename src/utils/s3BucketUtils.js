// s3UploadUtils.js
const AWS = require("aws-sdk");
require("dotenv").config();

class S3UploadUtils {
  static s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_AWS,
    secretAccessKey: process.env.SECRET_KEY_AWS,
    region: process.env.DEFAULT_REGION_AWS,
  });

  static async uploadImageToS3(file, imageKey) {
    const contentType = file.mimetype;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: imageKey,
      Body: file.buffer,
      ContentType: contentType,
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw error;
    }
  }

  static async deleteObjectFromS3(objectKey) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: objectKey,
    };

    try {
      const data = await this.s3.deleteObject(params).promise();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = S3UploadUtils;
