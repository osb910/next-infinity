import {writeFile} from '@/utils/file';
import {getPath} from '@/utils/path';
import {Types} from 'mongoose';
import resize from '../resize';
import type {FileObject, FileParser, Nulter} from './types';

export const parseFile: FileParser = async (file, options) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const [originalTitle] = file.name.split('.');
    const [type, ext] = file.type.split('/');
    const title = `${new Types.ObjectId()}_${originalTitle}`;
    const fileName = `${title}.${ext}`;
    const sizeKB = file.size / 1024;
    const sizeMB = sizeKB / 1024;
    const sizeGB = sizeMB / 1024;
    const readableSize =
      sizeKB < 1024
        ? `${sizeKB.toFixed(2)}kb`
        : sizeMB < 1024
        ? `${sizeMB.toFixed(2)}mb`
        : `${sizeGB.toFixed(2)}gb`;

    let data: any = {
      ...(options?.field && {fieldName: options.field}),
      originalTitle,
      originalName: file.name,
      mimetype: file.type,
      type,
      ext,
      // encoding: ,
      title,
      fileName,
      size: file.size,
      readableSize,
      buffer,
    };

    if (options?.resize && type.includes('image')) {
      data = await resize(data);
    }

    if (options.storage === 'disk') {
      const destination = getPath(options.dest).replace(/\\/g, '/');
      const path = `${destination}/${fileName}`;
      await writeFile(`${options.dest}/${fileName}`, buffer);
      data = {...data, destination, path};
    }

    return data;
  } catch (err) {
    console.error(err);
  }
};

const nulter: Nulter = async (body, options) => {
  const {field = 'file', storage = 'memory'} = options;

  let files: File[] | FileObject[] = body.getAll(field) as File[];

  if (!files || (files.length === 1 && files[0].name === 'undefined')) return;

  const promises = files.map((file) =>
    parseFile(file, {
      field,
      ...(options.storage === 'disk'
        ? {storage, dest: options?.dest ?? 'public/uploads'}
        : {storage: 'memory'}),
    })
  );
  files = (await Promise.all(promises)) as FileObject[];

  return files.length === 1 ? files[0] : files;
};

export default nulter;
