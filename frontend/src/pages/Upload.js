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
    formData.append('banner', banner);
    formData.append('apk', apk);

    try {
      const res = await axios.post('https://tstore-dkcf.onrender.com/api/apps/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(res.data.message);
      setTitle('');
      setDescription('');
      setBanner(null);
      setApk(null);
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed. Please check the file size or try again.');
    }
  };

  return (
    <div className="upload-container">
      <h2>📤 Upload New App</h2>
      {message && <p className="upload-message">{message}</p>}
      <form onSubmit={handleUpload} className="upload-form" encType="multipart/form-data">
        <input type="text" placeholder="App Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="App Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <label>Choose Banner Image (JPG/PNG)</label>
        <input type="file" accept="image/png, image/jpeg" onChange={e => setBanner(e.target.files[0])} required />
        <label>Choose APK File</label>
        <input type="file" accept=".apk" onChange={e => setApk(e.target.files[0])} required />
        <button type="submit">Upload App</button>
      </form>
    </div>
  );
}
