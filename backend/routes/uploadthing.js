const express = require('express');
const router = express.Router();
const { createUploadthing, UTApi } = require('uploadthing/server');

const f = createUploadthing();
const utapi = new UTApi();

router.post('/apk', async (req, res) => {
  try {
    const { filename, fileType } = req.body;

    const response = await f({
      apk: {
        maxFileSize: "512MB",
        allowedFileTypes: ["application/vnd.android.package-archive"],
      },
    }).getPresignedUrl({
      contentDisposition: "inline",
      metadata: {},
      slug: "apk",
    });

    res.json(response);
  } catch (err) {
    console.error('UploadThing error:', err);
    res.status(500).json({ message: "UploadThing error" });
  }
});

module.exports = router;
