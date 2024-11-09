const userModel=require("../models/userModel");

//Add items to cart
// Function to add an item to the user's cart
const addItem = async (req, res) => {
    try {
        // Find the user by their userId (provided in the request body)
        let userData = await userModel.findOne({ _id: req.body.userId });
       // console.log(userData); 

        // Retrieve the cartData object from the user's data
        let cartData = await userData.cartData;

        // Check if the item already exists in the cart
        if (!cartData[req.body.itemId]) {
            // If the item doesn't exist, add it to the cart with quantity 1
            cartData[req.body.itemId] = 1;
        } else {
            // If the item already exists, increment the quantity by 1
            cartData[req.body.itemId] += 1;
        }

        // Update the user's cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send a success response back to the client
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        // If any error occurs during the process, catch it and log it
        console.log(error);

        // Send an error response back to the client
        res.json({ success: false, message: "Error" });
    }
};




//Remove items from cart
const removeItem = async (req, res) => {
    try {
        // Find the user by their userId
        let userData = await userModel.findOne({ _id: req.body.userId });
        
        // Retrieve the cartData object
        let cartData = userData.cartData;

        // Check if the item exists in the cart
        if (!cartData[req.body.itemId]) {
            return res.json({ success: false, message: "Item not found in cart" });
        } else if (cartData[req.body.itemId] > 0) {
            // If item exists and the quantity is greater than 0, decrease the quantity
            cartData[req.body.itemId] -= 1;
        }

        // Update the cartData in the database
        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        // Send a success response back to the client
        res.json({ success: true, message: "Removed from Cart" });
    } catch (err) {
        // Handle any errors during the process
        res.json({ success: false, message: "Error" });
    }
};


//Fetch user data from cart
const getData = async (req, res) => {
    try {
        // Find the user by their userId
        let userData = await userModel.findOne({ _id: req.body.userId });
        
        // Check if user is found
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Retrieve the cartData object
        let cartData = userData.cartData;

        // Return the cartData in the response
        res.json({ success: true, cartData });
    } catch (err) {
        // Catch any errors and return an error response
        console.error(err);
        res.json({ success: false, message: "Error retrieving cart data" });
    }
};


module.exports={addItem,removeItem,getData};