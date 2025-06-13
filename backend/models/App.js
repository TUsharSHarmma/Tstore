const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  title: String,
  description: String,
  apkUrl: String,
  bannerUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('App', appSchema);
