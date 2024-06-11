import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({message : "Method not allowed"})
    }

    const {name,  images, category, price, description, quantity} = req.body;

    if (!name || !images || !category || !price || !description || !quantity   == null ) {
        return res.status(400).json({message : "All fields are required"})
    }

    try {
        await connectToDatabase();

        const newProduct = new Product({
            name,
            images,
            category,
            price,
            description,
            quantity,
        });
        await newProduct.save();

        return res.status(201).json({message: "Product added successfully", product: newProduct})
    } catch (error) {
        return res.status(500).json({message: "Server error", error:error.message})
    }
}