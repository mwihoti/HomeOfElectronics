import nextConnect from 'next-connect';
import { connectToDatabase } from '../../lib/mongodb';
import Product from '../../models/Product';

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
});

apiRoute.get(async (req, res) => {
  await connectToDatabase();

  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: `Server error! ${error.message}` });
  }
});

export default apiRoute;
