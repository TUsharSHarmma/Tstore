import { useState } from 'react';
import axios from 'axios';
import './Upload.css';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [apkUrl, setApkUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Upload APK file to UploadThing
  const handleApkUpload = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploadthing/apk", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data?.url) {
        setApkUrl(data.url);
        setMessage("✅ APK uploaded successfully!");
      } else {
        setMessage("❌ APK upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Error uploading APK.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apkUrl) {
      setMessage("❌ Please upload APK file first.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('banner', banner);
    formData.append('apkUrl', apkUrl); // URL only

    try {
      const res = await axios.post('https://tstore-dkcf.onrender.com/api/apps/upload', formData);
      setMessage(res.data.message);
      setTitle('');
      setDescription('');
      setBanner(null);
      setApkUrl('');
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload New App</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleSubmit} className="upload-form" encType="multipart/form-data">
        <input type="text" placeholder="App Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="App Description" value={description} onChange={e => setDescription(e.target.value)} required />

        <label>Banner Image (JPG/PNG)</label>
        <input type="file" accept="image/png, image/jpeg" onChange={e => setBanner(e.target.files[0])} required />

        <label>APK File (via UploadThing)</label>
        <input type="file" accept=".apk" onChange={e => handleApkUpload(e.target.files[0])} required />
        {isUploading && <p>Uploading APK...</p>}

        <button type="submit" disabled={isUploading || !apkUrl}>
          Upload App
        </button>
      </form>
    </div>
  );
}
