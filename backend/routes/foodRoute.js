const express = require("express");
const fs = require("fs");
const { addFood, listFood, removeFood } = require("../controllers/foodController");
const multer = require("multer");
const foodRoute = express.Router(); 

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"), // Save files to 'uploads' folder
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`) // Unique filenames with timestamp
});
const upload = multer({ storage }); 


// Routes
foodRoute.post("/add", upload.single("image"), addFood); // Add new food item with image upload
foodRoute.get("/list", listFood); // List all food items
foodRoute.delete("/remove", removeFood); // Delete a food item

module.exports = foodRoute;
