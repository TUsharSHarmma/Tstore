const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ✅ Proper CORS setup for frontend-backend communication
const corsOptions = {
  origin: ["https://tusharstore.xyz", "https://www.tusharstore.xyz", "https://tusharstore.vercel.app"], // 👈 your frontend domain on Render
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // only if you're using cookies or auth headers
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Serve static files (APK files)
app.use('/uploads', express.static('uploads')); // serve APKs

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));       // Auth routes (login/signup)
app.use('/api/apps', require('./routes/appRoutes'));  // App upload/download routes
app.use('/api/contact', require('./routes/contactRoutes'));

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
