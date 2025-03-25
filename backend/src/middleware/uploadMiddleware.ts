import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimeTypes = ['images/jpg', 'images/png', 'images/webp'];

  if(allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else{
    cb(new Error('Invalid file type'));
  }
}


export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter
}).single('profilePicture')
