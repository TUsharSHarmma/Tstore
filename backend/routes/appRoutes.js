const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const App = require('../models/App');
require('dotenv').config();

const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer memory storage (we stream to Cloudinary manually)
const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'apk', maxCount: 1 }
]);

// Upload Route
router.post('/upload', upload, async (req, res) => {
  try {
    const { title, description } = req.body;
    const bannerFile = req.files?.banner?.[0];
    const apkFile = req.files?.apk?.[0];

    if (!title || !description || !bannerFile || !apkFile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('🔁 Uploading banner to Cloudinary...');
    const bannerUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'tstore_banners', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(bannerFile.buffer);
    });

    console.log('🔁 Uploading APK to Cloudinary...');
    const apkUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'tstore_apks', resource_type: 'raw' },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(apkFile.buffer);
    });

    const newApp = new App({
      title,
      description,
      bannerUrl: bannerUpload.secure_url,
      apkUrl: apkUpload.secure_url
    });

    await newApp.save();
    res.json({ message: '✅ App uploaded successfully!', app: newApp });
  } catch (error) {
    console.error('❌ Upload error:', error);
    res.status(500).json({ message: 'Failed to upload to Cloudinary or save to DB' });
  }
});

// Get All Apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
