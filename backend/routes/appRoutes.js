const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const App = require('../models/App');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /api/apps/upload
router.post('/upload', upload.fields([{ name: 'apk' }, { name: 'banner' }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const apkFile = req.files['apk']?.[0];
    const bannerFile = req.files['banner']?.[0];

    if (!title || !description || !apkFile || !bannerFile) {
      return res.status(400).json({ message: 'Title, description, APK, and banner are required' });
    }

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const apkUrl = `${baseUrl}/uploads/${apkFile.filename}`;
    const bannerUrl = `${baseUrl}/uploads/${bannerFile.filename}`;

    const newApp = new App({ title, description, apkUrl, bannerUrl });
    await newApp.save();

    res.json({ message: 'App uploaded successfully!', app: newApp });
  } catch (err) {
    console.error(err);
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
