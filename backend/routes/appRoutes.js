const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const App = require('../models/App');

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Memory Storage (used for both files)
const upload = multer({ storage: multer.memoryStorage() });

// Upload Route
router.post('/upload', upload.fields([
  { name: 'banner', maxCount: 1 },
  { name: 'apk', maxCount: 1 }
]), async (req, res) => {
  const { title, description } = req.body;
  const bannerFile = req.files?.banner?.[0];
  const apkFile = req.files?.apk?.[0];

  if (!title || !description || !bannerFile || !apkFile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Upload banner to Cloudinary (image)
    const bannerUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'tstore_banners', resource_type: 'image' },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(bannerFile.buffer);
    });

    // Upload APK to Cloudinary (raw)
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
      apkUrl: apkUpload.secure_url,
    });

    await newApp.save();
    res.json({ message: 'App uploaded successfully!', app: newApp });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Failed to upload to Cloudinary' });
  }
});

// Fetch all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
