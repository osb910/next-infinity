import {getPath} from '@/utils/path';
import multer from 'multer';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, getPath('../public/uploads')),
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

// const fileFilter = (req, file, cb) => {
//   cb(null, /image\/((pn|jpe?|sv)g|webp)/.test(file.mimetype));
// };

const upload = multer({storage: fileStorage});

export {upload};
