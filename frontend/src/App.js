import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AppPage from './pages/AppPage';
import Upload from './pages/Upload';
import Contact from './pages/Contact'
import Login from './components/auth/Login';       // add Login component
import Signup from './components/auth/Signup';     // add Signup component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/app' element={<AppPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />         {/* Login route */}
        <Route path='/signup' element={<Signup />} />       {/* Signup route */}
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>

        

  );
}

export default App;
