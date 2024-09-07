import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import { StoreContext } from './context/StoreContext';
import Navbar from './components/Navbar/Navbar'
import Siderbar from './components/Sider/Siderbar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, url } = useContext(StoreContext); // Access token from context

  useEffect(() => {
    // Optionally perform any actions on mount or token change
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} /><hr />
      <div className="app-content">
        <Siderbar />
        <Routes>
          <Route path='/add' element={token && <Add />} />
          <Route path='/list' element={token && <List url={url} />} />
          <Route path='/orders' element={token && <Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
