const { Schema, model } = require("mongoose");
const validator = require("validator"); // You can install this package with `npm install validator`

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // Removes whitespace from both ends
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    cartData: {
        type: Object,
        default: {}
    }
},{minimize:false}); // Enable timestamps to track creation and update times

// Export the user model
const userModel = model("User", userSchema);
module.exports = userModel;
