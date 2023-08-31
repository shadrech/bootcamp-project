const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3")

class S3Upload {
    constructor(bucketName) {
      this.bucketName = bucketName
      this.client = new S3Client({
        region: 'eu-west-2',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET
        }
      });
    }
  
    async uploadToS3(objectKey, body) {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: objectKey,
        Body: body
      })
  
      await this.client.send(command);
    }
  
    async deleteObject(objectKey) {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: objectKey
      })
  
      await this.client.send(command)
    }
  }

  module.exports = S3Upload