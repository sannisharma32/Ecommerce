//add product to usercard
import userModel from '../models/userModel.js';


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1

            } else {

                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = { }
            cartData[itemId][size] = 1
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.status(200).json({ success: true, message: "Item added to cart" })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "add error message" })

    }

}



const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId);

        const cartData = await userData.cartData
        cartData[itemId][size] = quantity
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.status(200).json({ success: true, message: "Cart updated" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "updatecarty error message" })
        
    }

}
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let  cartData = await userData.cartData
        res.json({ success: true, cartData})

        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "getusercart data error message" })
    
    }
}


export { addToCart, updateCart, getUserCart}