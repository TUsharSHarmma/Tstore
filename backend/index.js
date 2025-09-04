const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// ✅ CORS Middleware – must be FIRST before any route
const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [
      "https://tusharstore.xyz",
      "https://www.tusharstore.xyz",
      "https://tusharstore.vercel.app",
      "https://tstore-kappa.vercel.app"

    ];
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

// ✅ Allow preflight for all routes
app.options('*', cors(corsOptions));

// Ensure 'uploads/' exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Middleware
app.use(express.json());
app.use('/uploads', express.static(uploadPath));

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/apps', require('./routes/appRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));