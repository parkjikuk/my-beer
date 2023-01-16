import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Like from './pages/Like';
import Profile from './pages/Profile';
import Search from './pages/Search';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/like" element={<Like />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
