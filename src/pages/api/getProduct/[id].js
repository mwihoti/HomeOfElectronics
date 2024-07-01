import {client} from '@/lib/client';


export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({message: 'Product ID is required'})
  }

  
  try {
    const query = `*[_type == "product" && _id == $id]{
      _id,
      name,
      price,
      quantity,
      description,
      "images":images[].asset->url
    }`;
    
    const params = {id};
    const product = await client.fetch(query, params)
    console.log('product', product)
    
    if (!product.length) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product[0]);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
}
