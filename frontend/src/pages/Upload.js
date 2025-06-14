import { useState } from 'react';
import axios from 'axios';
import './Upload.css';

export default function Upload() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState(null);
  const [apk, setApk] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('banner', banner); // image file
    formData.append('apk', apk);       // apk file

    try {
      const res = axios.post(`${process.env.REACT_APP_API_URL}/api/apps/upload`, formData)
      setMessage(res.data.message);
      setTitle('');
      setDescription('');
      setBanner(null);
      setApk(null);
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Please try again.');
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload New App</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleUpload} className="upload-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="App Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="App Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <label className="upload-label">Choose Banner Image (JPG/PNG)</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={e => setBanner(e.target.files[0])}
          required
        />
        <label className="upload-label">Choose APK File</label>
        <input
          type="file"
          accept=".apk"
          onChange={e => setApk(e.target.files[0])}
          required
        />
        <button type="submit">Upload App</button>
      </form>
    </div>
  );
}
