require('dotenv').config(); 
// at the top of server.js, after require('dotenv').config()
console.log('👉 OPENAI_API_KEY loaded?', !!process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // or './connectDB' if that's your file
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); 
const orderRoutes   = require('./routes/orderRoutes');
const path = require('path');



const cartRoutes = require("./routes/cartRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({ origin: allowedOrigin }));




app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // <-- Add this line
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/ai', require('./routes/aiRoutes'));



// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.use((req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
