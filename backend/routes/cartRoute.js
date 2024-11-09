const express=require("express");
const {addItem,removeItem,getData}=require("../controllers/cartController");
const cartRoute=express.Router();
const authMiddleware=require("../middlewares/auth");

cartRoute.post("/add",authMiddleware,addItem);
cartRoute.post("/remove",authMiddleware,removeItem);
cartRoute.post("/data",authMiddleware,getData);

module.exports=cartRoute;