import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Header from '../Header/Header';
const Navbar = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Load the theme from localStorage when the component mounts
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setCurrentTheme(newTheme);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  const orders = () => {
    navigate('/myorders');
  };

  return (
    <div className='navbar'>
      <Link to='/'>
      <span style={{cursor:'pointer',fontSize:30,fontWeight:'bold'}}> <img src={assets.frntr} alt="" style={{marginBottom:5}} /> Furni<span style={{color:'rgb(42, 139, 236)'}}>Flex</span></span>
      </Link>
      <ul className="navbar-menu">
        <NavLink to='/header' activeClassName='active'>Home</NavLink>
        <NavLink to='/' exact activeClassName='active'>Products</NavLink>
        <a href='#explore-menu' className='nav-link'>Categories</a>
        <a href='#app-download' className='nav-link'>Custom</a>
        <a href='#footer' className='nav-link'>Blog</a>
      </ul>
      
      <div className="navbar-right">
        <i style={{cursor:'pointer',fontSize:30}}  onClick={toggleTheme}>
          {currentTheme === 'dark' ? <i class="fa-regular fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
        </i>
        <div className="navbar-search-icon">
          <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className='nav-profile-dropdown'>
              <li onClick={orders}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
            </ul>
          </div>
        
      </div>
    </div>
  );
};

export default Navbar;
