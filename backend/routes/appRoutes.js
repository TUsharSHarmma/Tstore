const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const { v2: cloudinary } = require('cloudinary');
const App = require('../models/App');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer for banner (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Upload image to Cloudinary
const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// POST /api/apps/upload
router.post('/upload', upload.single('banner'), async (req, res) => {
  try {
    const { title, description, apkUrl } = req.body;
    const banner = req.file;

    if (!title || !description || !apkUrl || !banner) {
      return res.status(400).json({ message: 'All fields required.' });
    }

    const bannerUrl = await uploadToCloudinary(banner.buffer, 'tstore/banners');

    const app = new App({ title, description, bannerUrl, apkUrl });
    await app.save();

    res.json({ message: 'App uploaded successfully!', app });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error while uploading' });
  }
});

// GET /api/apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
