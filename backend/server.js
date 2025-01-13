import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './confiq/mongoDB.js';
import connectCloudinary from './confiq/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cardRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



const app=express();




const port=process.env.PORT ||4000;
connectDB()
connectCloudinary();



// middleware

app.use(express.json())
app.use(cors())
// api endpoint



app.use(express.json()); // Parse JSON bodies


app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cardRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send("api working ")
})




app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

