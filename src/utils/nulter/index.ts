import {writeFile} from '../file';
import {getPath} from '../path';
import {Types} from 'mongoose';

interface Nulter {
  body: FormData;
  field: string;
  dest: string;
}

const nulter = async ({body, field, dest}: Nulter) => {
  const file: FormDataEntryValue | null = body.get(field) as File;
  if (!file) return;
  try {
    const buffer = await file.arrayBuffer();
    const res = await writeFile(`${dest}/${file.name}`, Buffer.from(buffer));

    return {
      fieldname: field,
      originalname: file.name,
      // encoding: ,
      mimetype: file.type,
      size: file.size,
      destination: getPath(dest).replace(/\\/g, '/'),
      filename: `${new Types.ObjectId()}_${file.name}`,
      path: getPath(`${dest}/${file.name}`).replace(/\\/g, '/'),
      buffer: Buffer.from(buffer),
    };
  } catch (err) {
    console.error(err);
  }
};

export default nulter;
