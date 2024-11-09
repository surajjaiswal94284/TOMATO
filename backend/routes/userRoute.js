const express=require("express");
const {loginUser,registerUser}=require("../controllers/userController");
const userRoute=express.Router();


userRoute.post("/register",registerUser);
userRoute.post("/login",loginUser);

module.exports=userRoute;