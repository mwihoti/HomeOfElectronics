import nextConnect from "next-connect";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.statusCode(501).json({ error: `Sorry something happened! ${error.message}`});

  }
});

apiRoute.route.get(async (req, res) => {
  await connectToDatabase();

  const {productId} = req.query;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({error: 'Prouct not found'});

    }
    res.status(200).json(product);

  }
  catch (error) {
    res.status(500).json({error: error.message});
  }
});

export default apiRoute;