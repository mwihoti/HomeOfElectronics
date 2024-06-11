import connectToDatabase from '../../lib/mongodb';
import Product from '../../models/Product';
import multer from 'multer';
import nextConnect from 'next-connect';

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('images'));

apiRoute.post(async (req, res) => {
  try {
    await connectToDatabase();

    const { name, category, price, description, quantity } = req.body;
    const images = req.files.map(file => file.buffer.toString('base64'));

    const newProduct = new Product({
      name,
      images,
      category,
      price,
      description,
      quantity,
    });

    await newProduct.save();

    return res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
