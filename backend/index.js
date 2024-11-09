const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken"); // Import jwt here
const app = express();
const connectDB = require("./config/db");
const foodRoute = require("./routes/foodRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const port = 3000;
const foodModel = require("./models/foodModel");

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("uploads"));

// Connect to the database
connectDB();



// Token verification route
app.get('/api/test', (req, res) => {
  const token = req.headers['token']; // Get token from headers

  if (!token) {
      return res.status(401).json({ message: "No token provided" }); // If no token is provided
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(401).json({ message: "Token expired or invalid" }); // If token is expired or invalid
      }
      res.json({ message: "API is working fine!" }); // If token is valid
  });
});

// API endpoints
app.use("/api/food", foodRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// Start the server
app.listen(port, () => console.log("Server is listening on port", port));
