import userModel from "../models/userModel.js"
import User from "../models/models/User.js";
// add items to user cart
const addToCart = async (req, res) => {
    try {
        // Fetch user data by user ID from the request body
        let userData = await User.findById(req.body.userId) 
        
        // Retrieve the user's current cart data
        let cartData = await userData.cartData;
        
        // Check if the item is already in the cart
        if (!cartData[req.body.itemId]) {
            // If not, add it with a quantity of 1
            cartData[req.body.itemId] = 1;
        } else {
            // If it exists, increment the quantity by 1
            cartData[req.body.itemId] += 1;
        }
        
        // Update the user's cart data in the database
        await User.findByIdAndUpdate(req.body.userId, { cartData });
        
        // Send a success response
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        // Fetch user data by user ID from the request body
        let userData = await User.findById(req.body.userId);
        
        // Retrieve the user's current cart data
        let cartData = await userData.cartData;
        
        // Decrement the quantity of the item in the cart if it exists
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        
        // Update the user's cart data in the database
        await User.findByIdAndUpdate(req.body.userId, { cartData });
        
        // Send a success response
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await User.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({ success: true, cartData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCart }