import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import {assets} from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { url, token, setToken } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/loginadmin`, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred during login.');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setShowLogin(false);
  };

  return (
    <div className='login-popup'>
      {token ? (
        <div className='logout-container'>
          <h2>Logged In</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>Login</h2>
            <img src={assets.cross_icon} alt="Close" onClick={() => setShowLogin(false)} />
          </div>
          <div className="login-popup-inputs">
            <input
              type="email"
              name='email'
              onChange={onChangeHandler}
              value={data.email}
              placeholder='Your Email'
              required
            />
            <input
              type="password"
              name='password'
              onChange={onChangeHandler}
              value={data.password}
              placeholder='Password'
              required
            />
          </div>
          <button type='submit'>Login</button>
          <div className="login-popup-condition">
            
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
