const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
    name: {
        type: String,
        required: true, // Ensures the name is provided
        minlength: 3, // Minimum length of 3 characters
        maxlength: 100, // Maximum length of 100 characters
    },
    description: {
        type: String,
        required: true, // Ensures the description is provided
        minlength: 10, // Minimum length of 10 characters
        maxlength: 500, // Maximum length of 500 characters
    },
    price: {
        type: Number,
        required: true, // Ensures the price is provided
        min: 0, // Price should be a non-negative number
        max: 1000, // Optional: Maximum price limit
    },
    image: {
        type: String,
        required: true, // URL or path to the image
    },
    category: {
        type: String,
        required: true, // Ensures the category is provided
        enum: [
            'Salad',
            'Rolls',
            'Deserts',
            'Pasta',
            'Noodles',
            'Pure Veg',
            'Sandwich',
            'Cake',
        ], // Restricting categories to these values
    }
});

const foodModel = model("Food", foodSchema);



module.exports = foodModel;
