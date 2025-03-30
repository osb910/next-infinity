import nulter from './nulter';
import {uploadObject} from './s3';

export const processUploadFile = async (
  body: FormData,
  {
    field = 'image',
    folder = '',
    noDiskStorage = false,
  }: {
    field?: string;
    folder?: string;
    noDiskStorage?: boolean;
  }
): Promise<any> => {
  let file: File | any = body.get(field) as File;
  if (!file || file.name === 'undefined') return;

  try {
    // Parse file
    file = await nulter(body, {
      field,
      resize: true,
      ...(noDiskStorage
        ? {
            storage: 'memory',
          }
        : {
            storage: 'disk',
            dest: `public/uploads${folder && `/${folder}`}`,
          }),
    });

    // Upload to S3
    const uploaded = await uploadObject(
      `${folder && `${folder}/`}${file?.fileName}`,
      file?.buffer
    );

    if (!uploaded || uploaded.$metadata.httpStatusCode !== 200) {
      const err = new Error('File upload failed');
      throw err;
    }

    file = {...file, ...uploaded};

    return file;
  } catch (err) {
    console.error(err);
  }
};
