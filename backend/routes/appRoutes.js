const express = require('express');
const router = express.Router();
const multer = require('multer');
const streamifier = require('streamifier');
const { v2: cloudinary } = require('cloudinary');
const App = require('../models/App');

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload to Cloudinary Helper
const uploadToCloudinary = (buffer, folder, resource_type = 'image') =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

// POST /api/apps/upload
router.post('/upload', upload.fields([{ name: 'apk' }, { name: 'banner' }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = req.files?.banner?.[0];
    const apk = req.files?.apk?.[0];

    if (!title || !description || !banner || !apk) {
      return res.status(400).json({ message: 'All fields required.' });
    }

    // Upload files to Cloudinary
    const bannerUrl = await uploadToCloudinary(banner.buffer, 'tstore/banners', 'image');
    const apkUrl = await uploadToCloudinary(apk.buffer, 'tstore/apks', 'raw'); // for .apk use `raw`

    const app = new App({ title, description, bannerUrl, apkUrl });
    await app.save();

    res.json({ message: 'App uploaded successfully!', app });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error while uploading' });
  }
});

// GET /api/apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
