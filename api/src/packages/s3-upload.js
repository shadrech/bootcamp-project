const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const S3Upload = {
  async uploadToS3(bucketName, objectKey, body) {
    const client = new S3Client({
      region: 'eu-west-1',
      credentials: {
        accessKeyId: 'AKIAR2OD2TZO7HRAD6UY',
        secretAccessKey: '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'
      }
    });

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectKey,
      Body: body
    })

    await client.send(command);
  }
}

module.exports = S3Upload
