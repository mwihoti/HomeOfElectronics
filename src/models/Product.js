import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    images: {
        type: String
    },
    category: {
        type: String
    },
    Price: {
        type: String
    },
    Description : {
        type: String
    },
    Quantity: {
        type: Number
    }

})

export default  mongoose.models.Product || mongoose.model('Product', productSchema)