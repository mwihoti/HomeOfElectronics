import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import path from 'path';
import crypto from 'crypto'
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const mongoURI = process.env.MONGODB_URI

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const conn = await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
  })
};

export default connectToDatabase;
