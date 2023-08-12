import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

class S3Upload {
  constructor(bucketName) {
    this.bucketName = bucketName
    this.client = new S3Client({
      region: 'eu-west-1',
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

export default S3Upload
