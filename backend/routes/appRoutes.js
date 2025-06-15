const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const App = require('../models/App');
const router = express.Router();

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper: Upload Buffer to Cloudinary
function uploadBufferToCloudinary(buffer, folder, resource_type) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type },
      (err, result) => {
        if (result) resolve(result.secure_url);
        else reject(err);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// POST /api/apps/upload
router.post('/upload', upload.fields([{ name: 'apk' }, { name: 'banner' }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const apkFile = req.files['apk']?.[0];
    const bannerFile = req.files['banner']?.[0];

    if (!title || !description || !apkFile || !bannerFile) {
      return res.status(400).json({ message: 'Title, description, APK, and banner are required' });
    }

    const bannerUrl = await uploadBufferToCloudinary(bannerFile.buffer, 'tstore/banners', 'image');
    const apkUrl = await uploadBufferToCloudinary(apkFile.buffer, 'tstore/apks', 'raw');

    const newApp = new App({ title, description, bannerUrl, apkUrl });
    await newApp.save();

    res.json({ message: 'App uploaded successfully!', app: newApp });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error while uploading app' });
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
