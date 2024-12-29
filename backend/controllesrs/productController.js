  
import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/Productmodel.js'



//  funtion for add product


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        // Check for required fields
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All required fields (name, description, price, category) must be provided",
            });
        }

        // Handle uploaded files
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to Cloudinary
        const imgagesUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Debugging logs
        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(imgagesUrl);

        // Prepare product data
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes || "[]"), // Handle cases where `sizes` is undefined
            image: imgagesUrl,
            date: Date.now(),
        };
        console.log(productData);

        // Save the product
        const product = new productModel(productData);
        const result = await product.save(); // Added `await` to handle asynchronous operation

        // Send response
        res.json({
            success: true,
            message: "Product added successfully",
            data: result, // Send saved product data instead of raw input data
        });

    } catch (error) {
        // Error handling
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};




//list product

const listProduct =async (req,res)=>{
    try {
        const product= await productModel.find({})
        res.json({success:true,product})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
        
    }

}

//function for removing product 

const removeProduct =async(req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"product removed successfully"})
        
    } catch (error) {
        console.error(error);
        req.json({success:true,message:error.message })
        
    }

}


//function for single product info


const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body; // Get productId from the request body

        // Check if productId is provided
        if (!productId) {
            return res.status(400).json({ 
                success: false, 
                message: "Product ID is required" 
            });
        }

        // Fetch the product from the database using the provided ID
        const product = await productModel.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Send a success response with the product details
        res.json({ 
            success: true, 
            product 
        });

    } catch (error) {
        console.error(error);

        // Handle server errors
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export {addProduct,listProduct,removeProduct,singleProduct}