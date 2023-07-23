import nulter from './nulter';
import resize from './resize';
import {uploadOneObject} from './s3';

const processUploadImage = async (
  body: FormData,
  field: string = 'image'
): Promise<any> => {
  let file: File | any = body.get(field) as File;
  if (!file || file.name === 'undefined') return;

  try {
    // Parse file
    file = await nulter(body, {
      field: 'photo',
    });

    // Resize image
    file = await resize(file);

    // Upload to S3
    const uploaded = await uploadOneObject(
      `next-stores/${file?.fileName}`,
      file?.buffer!
    );

    if (!uploaded || uploaded.$metadata.httpStatusCode !== 200) {
      const err = new Error('Image upload failed');
      throw err;
    }

    file = {...file, ...uploaded};

    return file;
  } catch (err) {
    console.error(err);
  }
};

export {processUploadImage};
