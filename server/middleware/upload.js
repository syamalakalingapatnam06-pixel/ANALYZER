import multer from 'multer';
import path from 'path';

// Memory storage to process buffer directly (pdf-parse and mammoth)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
  ];
  
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(file.mimetype) || ['.pdf', '.docx', '.doc'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file format. Only PDF and DOCX documents under 5MB are supported.'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5 MB
  },
  fileFilter,
});
