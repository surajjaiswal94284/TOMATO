const express=require("express");
const {placeOrder,verifyOrder, userOrders, listOrders,updateOrderStatus}=require("../controllers/orderController");
const orderRoute=express.Router();
const authMiddleware=require("../middlewares/auth");


orderRoute.post("/place",authMiddleware,placeOrder);
orderRoute.post("/verify",verifyOrder);
orderRoute.post("/userorders",authMiddleware,userOrders);
orderRoute.get("/list",listOrders);
orderRoute.put('/status', updateOrderStatus);

module.exports=orderRoute;