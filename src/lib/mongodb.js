import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const mongoURI = process.env.MONGODB_URI;
let gfs;

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const conn = await mongoose.connect(mongoURI, {
    
  });

  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });

  return conn;
};

const storage = new GridFsStorage({
  url: mongoURI,
  
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

export  { connectToDatabase, upload, gfs };
   