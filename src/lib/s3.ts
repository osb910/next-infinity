import {
  S3,
  PutObjectCommandInput,
  S3ServiceException,
} from '@aws-sdk/client-s3';

export type FileMetaData = {
  key: string;
  title: string;
  name: string;
  ext: string;
  folder: string;
  bucket: string;
  eTag: string;
  lastModified: Date;
  size: number;
};

const client = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const uploadOneObject = async (fileName: string, data: Buffer) => {
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

const getOneObject = async (fileKey: string) => {
  try {
    const fileObject = await client.getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
    return {
      key: fileKey,
      data: fileObject.Body,
      contentType: fileObject.ContentType,
      lastModified: fileObject.LastModified ?? new Date(),
      size: fileObject.ContentLength ?? 0,
      eTag: fileObject.ETag ?? '',
      statusCode: fileObject.$metadata.httpStatusCode,
    };
  } catch (err) {
    if (!(err instanceof S3ServiceException)) return;
    console.log(JSON.stringify(err, null, 2));
    return {
      // @ts-ignore
      key: err.Key ?? fileKey,
      fault: err.$fault,
      statusCode: err.$metadata.httpStatusCode,
      code: err.name,
      data: null,
      message: err.message,
    };
  }
};

const deleteOneObject = async (fileKey: string) => {
  try {
    return await client.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteManyObjects = async (fileKeys: string[]) => {
  try {
    const {Deleted} = await client.deleteObjects({
      Bucket: process.env.AWS_BUCKET_NAME,
      Delete: {
        Objects: fileKeys.map(key => ({Key: key})),
      },
    });

    console.log(
      `Successfully deleted ${
        Deleted?.length ?? 0
      } objects from S3 bucket. Deleted objects:
      ${Deleted?.map(d => ` • ${d.Key}`).join('\n')}
      `
    );

    return Deleted;
  } catch (err) {
    console.error(err);
  }
};

const listFileObjects = async (): Promise<
  [FileMetaData[], string[]] | void
> => {
  try {
    const contents = await client.listObjectsV2({
      Bucket: process.env.AWS_BUCKET_NAME,
    });

    const files: FileMetaData[] = [];
    const folders: string[] = [];

    if (!contents.Contents) return [files, folders];

    contents.Contents.forEach(({Key, LastModified, ETag, Size}) => {
      if (!Key) return;
      const paths = Key.split('/');
      const name = paths.pop()!;
      const [title, ext] = name.split('.');
      const folder = paths.join('/');
      if (Key.match(/\/$/)) {
        folders.push(Key);
      } else {
        const file: FileMetaData = {
          key: Key,
          name,
          title,
          ext,
          folder,
          bucket: process.env.AWS_BUCKET_NAME!,
          eTag: ETag ?? '',
          lastModified: LastModified ?? new Date(),
          size: Size ?? 0,
        };
        files.push(file);
      }
    });

    return ([files, folders] as [FileMetaData[], string[]]) ?? [];
  } catch (err) {
    console.error(err);
  }
};

const listBuckets = async () => {
  try {
    const contents = await client.listBuckets({});
    return {buckets: contents.Buckets, owner: contents.Owner};
  } catch (err) {
    console.error(err);
  }
};

const createBucket = async (bucketName: string) => {
  try {
    return await client.createBucket({Bucket: bucketName});
  } catch (err) {
    console.error(err);
  }
};

const deleteBucket = async (bucketName: string) => {
  try {
    return await client.deleteBucket({Bucket: bucketName});
  } catch (err) {
    console.error(err);
  }
};

export {
  uploadOneObject,
  getOneObject,
  deleteOneObject,
  deleteManyObjects,
  listFileObjects,
  listBuckets,
  createBucket,
  deleteBucket,
};
