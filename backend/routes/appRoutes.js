const express = require('express');
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const App = require('../models/App');

const router = express.Router();

// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Cloudinary Storage for Banner Image
const bannerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tstore_banners',
    allowed_formats: ['jpg', 'png']
  }
});
const uploadBanner = multer({ storage: bannerStorage }).single('banner');

// 3. Local Disk Storage for APK
const apkStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const uploadApk = multer({ storage: apkStorage }).single('apk');

// 4. Upload Route: Banner (Cloudinary) + APK (Local)
router.post('/upload', (req, res) => {
  uploadBanner(req, res, function (bannerErr) {
    if (bannerErr || !req.file) {
      console.error('Banner upload failed:', bannerErr);
      return res.status(500).json({ message: 'Banner upload failed' });
    }

    const bannerUrl = req.file.path; // Cloudinary returns 'path' as URL

    uploadApk(req, res, async function (apkErr) {
      if (apkErr || !req.file) {
        console.error('APK upload failed:', apkErr);
        return res.status(500).json({ message: 'APK upload failed' });
      }

      const apkFile = req.file;
      const { title, description } = req.body;

      if (!title || !description || !bannerUrl || !apkFile) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const apkUrl = `${baseUrl}/uploads/${apkFile.filename}`;

      try {
        const newApp = new App({ title, description, bannerUrl, apkUrl });
        await newApp.save();
        res.json({ message: 'App uploaded successfully!', app: newApp });
      } catch (err) {
        console.error('Database save failed:', err);
        res.status(500).json({ message: 'Failed to save app data' });
      }
    });
  });
});

// 5. GET all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
