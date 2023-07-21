import sharp from 'sharp';

export type ResizeOptions = {
  width?: number;
  height?: number;
  quality?: number;
  ext?: string;
};

const resize = async (
  file: any,
  {width = 800, height, quality = 90, ext}: ResizeOptions = {}
) => {
  if (!file || file.type !== 'image') return;

  try {
    const {data, info} = await sharp(file.buffer)
      .resize({width, ...(height && {height})})
      .toFormat(ext ?? file.ext, {quality})
      .toBuffer({resolveWithObject: true});

    const sizeKB = info.size / 1024;
    const sizeMB = sizeKB / 1024;
    const readableSize =
      sizeKB < 1024 ? `${sizeKB.toFixed(2)}kb` : `${sizeMB.toFixed(2)}mb`;

    return {
      ...file,
      buffer: data,
      title: `${file.title}_${info.width}x${info.height}`,
      fileName: `${file.title}_${info.width}x${info.height}.${info.format}`,
      size: info.size,
      readableSize,
    };
  } catch (err) {
    console.error(err);
  }
};

export default resize;
