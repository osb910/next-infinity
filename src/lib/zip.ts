import AdmZip from 'adm-zip';

export type FileData = {
  key: string;
  buffer: Buffer;
  [idx: string]: any;
};

export type Compress = (data: any[]) => Promise<Buffer | void>;

const compress: Compress = async data => {
  const zip = new AdmZip();

  try {
    for (const file of data) {
      if (!file.buffer) {
        console.error(`Skipping ${file.key} because it has no valid buffer.`);
        continue;
      }
      zip.addFile(file.key!, Buffer.from(file.buffer));
    }

    const zipped = zip.toBuffer();
    return zipped;
  } catch (err) {
    if (!(err instanceof Error)) return;
    console.error(err);
  }
};

export {compress};
