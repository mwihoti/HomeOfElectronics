import nextConnect from 'next-connect';
import { client } from '@/lib/client';
const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      price,
      quantity,
      "images": images[].asset->url
    }`;
    const products = await client.fetch(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: `Server error! ${error.message}` });
  }
});

export default apiRoute;