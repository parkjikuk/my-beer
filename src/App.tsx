import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Detail from './pages/Detail';
import Home from './pages/Home';
import Like from './pages/Like';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from './store/store';
import { authSlice } from './store/features/authSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUnload = () => {
      dispatch(authSlice.actions.logout());
    };
  
    window.addEventListener("unload", handleUnload);
    window.addEventListener("pagehide", handleUnload);
  
    return () => {
      window.removeEventListener("unload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
    <ToastContainer />
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/like" element={<Like />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
