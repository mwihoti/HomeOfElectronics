import nextConnect from 'next-connect';
import multer from 'multer';
import connectToDatabase from '../../lib/mongodb';
import Product from '../../models/Product';

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

  const { name, category, price, description, quantity } = req.body;
  const images = req.files ? req.files.map((file) => file.buffer.toString('base64')) : [];

  const newProduct = new Product({
    name,
    images,
    category,
    price,
    description,
    quantity,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

apiRoute.get(async (req, res) => {
  const db = await connectToDatabase();

  try {
    const products = await Product.find({});
    res.status(200).json({ database: db.name, products });
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
