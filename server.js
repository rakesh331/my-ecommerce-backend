const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const couponRoutes = require('./routes/couponRoutes'); // Import coupon routes
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/coupons', couponRoutes); // Use coupon routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
