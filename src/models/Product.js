import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

})

export default  mongoose.models.Product || mongoose.model('Product', productSchema)