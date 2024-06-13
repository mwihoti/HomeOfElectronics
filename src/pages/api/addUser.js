import nextConnect from 'next-connect';
import multer from 'multer';
import connectToDatabase from '../../lib/mongodb';
import Users from '../../models/Users';

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('images', 10));

apiRoute.post(async (req, res) => {
  await connectToDatabase();

  const { firstName, description, telNumber } = req.body;
  const images = req.files ? req.files.map((file) => file.buffer.toString('base64')) : [];

  const newUser = new Users({
    firstName,
    description,
    telNumber,
    images,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;