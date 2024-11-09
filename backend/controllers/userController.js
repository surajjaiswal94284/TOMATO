const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Load environment variables from .env file
require("dotenv").config();


const loginUser = async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    try {
        // Check if both email and password are provided
        if (!email || !password) {
            return res.json({ success: false, message: "Email and password are required" });
        }

        // Validate email format using validator
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email address" });
        }

        // Find the user in the database by their email
        const user = await userModel.findOne({ email });
        
        // If no user is found, return an error message for invalid credentials
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords do not match, return an error message for invalid credentials
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Generate a JWT token, with user ID as payload, and an expiry time of 1 hour
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // If login is successful, return a success message along with the generated token
        res.json({ success: true, message: "Login successful", token });

    } catch (err) {
        // If there's an error during the process, log it to the console and send a server error response
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





// Function to handle user registration
const registerUser = async (req, res) => {
    // Destructure the user details from the request body
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists in the database
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: true, message: "User already exists" });
        }

        // Validate email format using validator library
        if (!validator.isEmail(email)) {
            return res.json({ success: true, message: "Enter a valid email address" });
        }

        // Ensure password is at least 8 characters long
        if (password.length < 8) {
            return res.json({ success: true, message: "Enter a stronger password" });
        }

        // Hash the password for secure storage
        let hashPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password and other details
        let data = new userModel({
            name,
            email,
            password: hashPassword,
        });
        
        // Save the new user to the database
        await data.save();

        // Generate a JWT token for the registered user, valid for 1 hour
        const token = jwt.sign({ userId: data._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Send a response indicating success along with the generated token
        res.json({ success: true, message: "User registered successfully", token });

    } catch (err) {
        // Log any server error to the console for debugging
        console.error(err);
        
        // Send a 500 error response in case of server issues
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Export the loginUser and registerUser functions to be used in other parts of the application
module.exports = { loginUser, registerUser };
