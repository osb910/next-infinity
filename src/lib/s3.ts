import {PutObjectCommandInput, S3} from '@aws-sdk/client-s3';

const client = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploadFile = async (fileName: string, data: Buffer) => {
  const fileData = data.buffer;
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileData,
  };

  try {
    return await client.putObject(uploadParams as PutObjectCommandInput);
  } catch (err) {
    console.error(err);
  }
};

const getFile = async (fileKey: string) => {
  try {
    const fileObject = await client.getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
    return fileObject.Body?.transformToWebStream();
  } catch (err) {
    console.error(err);
  }
};

const deleteFile = async (fileKey: string) => {
  try {
    return await client.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
  } catch (err) {
    console.error(err);
  }
};

export {uploadFile, getFile, deleteFile};
