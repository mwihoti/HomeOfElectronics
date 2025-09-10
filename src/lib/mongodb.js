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
    return mongoose.connection;
  }

  if (!mongoURI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  console.log('Attempting to connect to MongoDB...');
  console.log('MongoDB URI (partial):', mongoURI.substring(0, 20) + '...');

  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }

  mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
  });

  return mongoose.connection;
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

export { connectToDatabase, upload, gfs };
