const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const App = require('../models/App');

const router = express.Router();

// 1. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Cloudinary Storage for Banner
const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tstore_banners',
    allowed_formats: ['jpg', 'png'],
    resource_type: 'image'
  }
});

// 3. Multer Memory Storage for APK (upload to Cloudinary manually)
const apkStorage = multer.memoryStorage();

// 4. Set up Multer Fields
const upload = multer({
  storage: (req, file, cb) => {
    if (file.fieldname === 'banner') cb(null, bannerStorage);
    else cb(null, apkStorage);
  }
}).fields([
  { name: 'banner', maxCount: 1 },
  { name: 'apk', maxCount: 1 }
]);

// 5. POST /api/apps/upload
router.post('/upload', (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ message: 'File upload error' });
    }

    const { title, description } = req.body;
    const bannerFile = req.files?.banner?.[0];
    const apkFile = req.files?.apk?.[0];

    if (!title || !description || !bannerFile || !apkFile) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Upload APK file buffer to Cloudinary
      const apkUploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tstore_apks', resource_type: 'raw' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(apkFile.buffer);
      });

      const apkUrl = apkUploadRes.secure_url;
      const bannerUrl = bannerFile.path;

      const newApp = new App({ title, description, bannerUrl, apkUrl });
      await newApp.save();

      res.json({ message: 'App uploaded successfully!', app: newApp });
    } catch (error) {
      console.error('Final upload error:', error);
      res.status(500).json({ message: 'Failed to upload to Cloudinary' });
    }
  });
});

// 6. GET /api/apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find().sort({ uploadedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch apps' });
  }
});

module.exports = router;
