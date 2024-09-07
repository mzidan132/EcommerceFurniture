import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrder from './pages/MyOrder/MyOrder.jsx'
import Header from './components/Header/Header.jsx'
import { StoreContext } from './context/StoreContext.jsx'
import Register from './components/LoginPopup/Register.jsx'
import Login from './components/LoginPopup/Login.jsx'

const App = () => {
  // token is a serverless modern session which is more optimized secured cause it saves users credentials at browser localstorage client
  const { token } = useContext(StoreContext)

  return (
    <>
      <div className='app'>
        {token && <Navbar />}

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />
          <Route path='/cart' element={token ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/order' element={token ? <PlaceOrder /> : <Navigate to='/login' />} />
          <Route path='/verify' element={token ? <Verify /> : <Navigate to='/login' />} />
          <Route path='/myorders' element={token ? <MyOrder /> : <Navigate to='/login' />} />
          <Route path='/header' element={token ? <Header /> : <Navigate to='/login' />} />
        </Routes>
      </div>
      {token && <Footer />}
    </>
  )
}

export default App
