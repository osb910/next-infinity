import jimp from 'jimp';

const resize = async (fileObject: any) => {
  const ext = fileObject.mimetype.split('/')[1];

  try {
    const photo = await jimp.read(fileObject.buffer);
    return await photo.resize(800, jimp.AUTO);
  } catch (err) {
    console.error(err);
  }
};

export default resize;
