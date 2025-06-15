const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ✅ Trust proxy for Render (if using HTTPS & CORS)
app.set('trust proxy', 1);

// ✅ Proper CORS setup
const corsOptions = {
  origin: [
    'https://tusharstore.xyz',
    'https://www.tusharstore.xyz',
    'https://tusharstore.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // only if cookies or auth headers are used
};
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// ✅ Serve static uploads if needed (optional for Cloudinary)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));       
app.use('/api/apps', require('./routes/appRoutes'));  
app.use('/api/contact', require('./routes/contactRoutes'));

// ✅ Default health check route
app.get('/', (req, res) => {
  res.send('✅ Backend running...');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
