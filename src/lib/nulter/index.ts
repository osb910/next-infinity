import {writeFile} from '../../utils/file';
import {getPath} from '../../utils/path';
import {Types} from 'mongoose';

type Nulter = {
  body: FormData;
  field: string;
  storage?: 'memory' | 'disk';
  dest?: string;
};

interface FileObject {
  fieldname: string;
  originalname: string;
  // encoding: string;
  mimetype: string;
  size: number;
  filename: string;
  buffer: Buffer;
  destination?: string;
  path?: string;
}

const nulter = async ({
  body,
  field,
  storage = 'memory',
  dest = 'public/uploads',
}: Nulter): Promise<FileObject | undefined> => {
  const file: FormDataEntryValue | null = body.get(field) as File;
  if (!file) return;
  try {
    const fileBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(fileBuffer);
    const filename = `${new Types.ObjectId()}_${file.name}`;

    let output: any = {
      fieldname: field,
      originalname: file.name,
      // encoding: ,
      mimetype: file.type,
      size: file.size,
      filename,
      buffer,
    };

    if (storage === 'disk') {
      const destination = getPath(dest).replace(/\\/g, '/');
      const path = `${destination}/${filename}`;
      const res = await writeFile(`${dest}/${filename}`, buffer);
      output = {...output, destination, path};
    }

    return output;
  } catch (err) {
    console.error(err);
  }
};

export default nulter;
