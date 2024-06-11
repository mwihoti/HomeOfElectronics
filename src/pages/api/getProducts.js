import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
    if (req.method != 'GET') {
        return res.status(405).json({message: `Method ${req.method} not allowed`})
    }

    try {
        await connectToDatabase();
        const products = await Product.find({});
        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({message: 'server error', error: error.message})
        
    }
}