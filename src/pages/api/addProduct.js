import nextConnect from 'next-connect';
import multer from 'multer';
import { connectToDatabase, gfs } from '../../lib/mongodb';
import Product from '../../models/Product';
import cloudinary from '@/lib/cloudinary';


// 

const upload = multer({ 
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error); // Log the error for debugging
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
  const imageUrls = [];

  if (req.files) {
    for (const file of req.files) {
      await new Promise ((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image'}, (error, result) => {
          if (error) {
            console.error('cloudinary upload error', error);
            return res.status(500).json({ error: 'Image uplaod failed'});
          }
          imageUrls.push(result.secure_url)
          resolve();
        }).end(file.buffer)
      })
    }
  }

  const newProduct = new Product({
    name,
    images: imageUrls,
    category,
    price,
    description,
    quantity,   
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
});


export const config = {
  api: {
    bodyParser: false,
  },
};

export default apiRoute;
