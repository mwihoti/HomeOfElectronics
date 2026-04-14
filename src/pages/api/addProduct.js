import nextConnect from 'next-connect';
import multer from 'multer';
import Product from '../../models/Product';

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('images', 10));

apiRoute.post(async (req, res) => {
  const { name, category, price, description, quantity } = req.body;
  const images = req.files ? req.files.map((file) => file.buffer.toString('base64')) : [];

  try {
    const savedProduct = await Product.create({
      name,
      images,
      category,
      price,
      description,
      quantity: parseInt(quantity, 10),
    });
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
