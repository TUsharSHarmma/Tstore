const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const App = require('../models/App');

const router = express.Router();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Storage for banner
const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tstore_banners',
    resource_type: 'image',
    allowed_formats: ['jpg', 'png']
  }
});

// ✅ Multer setup
const upload = multer({
  storage: multer.memoryStorage(), // APK in memory
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
}).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'apk', maxCount: 1 }
]);

// ✅ Upload route
router.post('/upload', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).json({ message: 'Upload failed. Please check the file size or try again.' });
    }

    const { title, description } = req.body;
    const bannerFile = req.files?.banner?.[0];
    const apkFile = req.files?.apk?.[0];

    if (!title || !description || !bannerFile || !apkFile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // ✅ Upload banner to Cloudinary
      const bannerUpload = await cloudinary.uploader.upload_stream(
        { folder: 'tstore_banners', resource_type: 'image' },
        (error, result) => {
          if (error) throw error;
          return result;
        }
      );

      // ✅ Upload APK to Cloudinary
      const apkUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tstore_apks', resource_type: 'raw' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(apkFile.buffer);
      });

      const newApp = new App({
        title,
        description,
        bannerUrl: bannerFile.path, // Already uploaded by Cloudinary
        apkUrl: apkUpload.secure_url
      });

      await newApp.save();
      res.json({ message: 'App uploaded successfully!', app: newApp });

    } catch (error) {
      console.error('Upload failed:', error);
      res.status(500).json({ message: 'Upload failed. Please try again.' });
    }
  });
});

// ✅ Get all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
