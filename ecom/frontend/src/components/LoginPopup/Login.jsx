import React, { useState, useContext, useEffect } from 'react';
import './login.css'; // Retains original CSS structure
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {message} from 'antd'

const Login = ({ setShowLogin }) => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and sign-up
  const { url, setToken, token } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/user/login' : '/api/user/register';

    try {
      const response = await axios.post(url + endpoint, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login/signup:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const response = await fetch('http://localhost:8000/api/protected', { // Adjust URL if necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },

      });

      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };
  useEffect(() => {
    // If no token, redirect to login page
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);
  return (
    <>
      <div className="section">
        <div className="container" style={{ height: 430 }}>
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p className="start-p" style={{ textAlign: 'left' }}>
            {isLogin ? 'Enter your credentials to access your account' : 'Fill in the details to create your account'}
          </p>

          <form onSubmit={onSubmitHandler}>
            <div className="input-container">
              <input
                type="email"
                className="custom-input"
                placeholder="Email Address"
                name="email"
                value={data.email}
                onChange={onChangeHandler}
                required
              />
              <span className="extra-description">Enter your email</span>
            </div>
            <div className="input-container">
              <input
                type="password"
                className="custom-input"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
              <span className="extra-description">Enter your password</span>
            </div>

            {isLogin && <p className="forgot">Forgot Password?</p>}

            <input type="checkbox" required />&nbsp;
            <span style={{ fontSize: 'small' }}>
              I agree to <u>Term & Policy</u>
            </span>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="btn-container">
              <button className="btn" type="submit">
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </div>
          </form>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <p className="small">or</p>

          <div className="btn-group">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            <button className="btn-half" onClick={handleGoogleSignIn}>
              <i className='fa-brands fa-google'></i>&nbsp;Sign in with Google
            </button>
            <button className="btn-half">
              <i className='fa-brands fa-apple'></i>&nbsp;Sign in with Apple
            </button>
          </div>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <p className="small">
            Don't have an account?&nbsp;
            <span style={{ cursor: 'pointer', color: 'blue' }}> <Link to='/register'>Sign Up</Link>
            </span>
          </p>
        </div>

        <div className="img">
          <img src={assets.picbg} alt="Background" />
        </div>
      </div>
    </>
  );
};

export default Login;
