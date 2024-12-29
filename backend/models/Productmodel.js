import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: Array,
        required: true

    },
    category: {
        type: String,
        required: true
    },

    subCategory: {
        type: String,
        required: true

    },
    sizes: {
        type: Array,
        required: true,
    },
    bestseller: {
        type: Boolean,
    },
    data: {
        type:Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the current date and time
    },
})


const productModel = mongoose.model.product || mongoose.model("product", productSchema)

export default productModel