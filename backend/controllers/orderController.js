const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // Create a new order document in the database
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });

        // Save the order in the database
        await newOrder.save();

        // Prepare line items for Stripe
        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr", // Currency in INR (Indian Rupees)
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 80 * 100 // Convert price to smallest unit (paise)
            },
            quantity: item.quantity
        }));

        // Adding delivery charge to line items
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: 5 * 20 * 100 // Delivery charge (in paise)
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            success_url: `https://food-frontend-1fs3.onrender.com/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `https://food-frontend-1fs3.onrender.com/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment', // Payment mode for a one-time payment
        });

        // Respond with the Stripe session URL for the frontend to redirect the user to
        res.json({ success: true, session_url: session.url });

        // Clear the user's cart data after the order is placed
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

    } catch (err) {
        console.error("Error placing order:", err);
        res.json({ success: false, message: "Error placing order" });
    }
};


const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    console.log("verifyOrder called with:", { orderId, success });
    try {
        if (success == 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not-Paid" });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Error" });
    }
};


const listOrders=async(req,res)=>{
    try{
        const allOrders=await orderModel.find({});
        res.json({success:true,data:allOrders})
    }catch(err){
        res.json({success:true,message:"Error"})
    }
};



const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    }catch(err){
        res.json({success:false,message:"Error"})
    };
};

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
      const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
      if (order) {
        res.json({ success: true, message: "Order status updated", data: order });
      } else {
        res.json({ success: false, message: "Order not found" });
      }
    } catch (err) {
      console.error(err);
      res.json({ success: false, message: "Error updating order status" });
    }
  };
module.exports = {placeOrder,verifyOrder,userOrders,listOrders,updateOrderStatus};

