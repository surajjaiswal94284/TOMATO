const { Schema, model } = require("mongoose");

const orderSchema=new Schema({
    userId: {
        type: String, 
        required: true,
    },
    items: {
        type:Array,
        required:true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    address: {
        type: Object, 
        required: true
    },
    status: {
        type: String, 
        required: true,
        enum: ['Preparing', 'Shipped', 'Delivered'], 
        default: 'Preparing'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        required: true,
        default:false
    }
}); 

const orderModel=model("order",orderSchema);

module.exports=orderModel;