import React, { useState, useContext,useEffect } from 'react';
import '../Navbar/register.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const { url, token, setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + '/api/user/register', data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
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
        <div className="container" style={{height:520}}><br/>
          <div style={{ textAlign: 'center' }}>
            <p className="heading" style={{ fontSize: 25 }}>Welcome To</p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <p style={{fontSize:40}}>Furni<span style={{ color: 'rgb(6, 181, 250)' }}>Flex</span></p><br /><br />
          </div>
          <br /><br /><br /><br /><br />
          <p className="start-p">Signup for purchasing your desired products</p>

          <form onSubmit={onSubmitHandler}>
            <div className="input-container-mul">
              <div className="input-container">
                <input 
                  type="text" 
                  className="custom-input" 
                  name="firstName" 
                  value={data.firstName}
                  onChange={onChangeHandler}
                  
                />
                <span className="extra-description">First Name (optional)</span>
              </div>
              <div className="input-container">
                <input 
                  type="text" 
                  className="custom-input" 
                  name="lastName" 
                  value={data.lastName}
                  onChange={onChangeHandler}
                  
                />
                <span className="extra-description">Last Name (optional)</span>
              </div>
            </div>
            <div className="input-container">
              <input 
                type="email" 
                className="custom-input" 
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
                name="password" 
                value={data.password}
                onChange={onChangeHandler}
                placeholder="Enter your password" 
                required 
              />
              <span className="extra-description">Enter your password</span>
            </div>
            <input type="checkbox" required />&nbsp;
            <span style={{ fontSize: 'small' }}>I agree to <u>Term & Policy</u></span>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="btn">
              <button style={{padding:1}} className="btn" type="submit">Create Account</button>
            </div>
          </form>
<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <p className="small">or</p>
          <div className="btn-group">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
            <button className="btn-half" onClick={handleGoogleSignIn}>
              <i className='fa-brands fa-google'></i>&nbsp;Sign in with Gogle
            </button>
            <button className="btn-half">
              <i className='fa-brands fa-apple'></i>&nbsp;Sign in with Apple
            </button>
          </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <p className="small">
            Have an account?&nbsp;
            <span style={{ cursor: 'pointer', color: 'blue' }}><Link to ='/login'>Sign In</Link></span>
          </p>
        </div>
        <div className="img"><img src={assets.picbg} alt=""/></div>
      </div>
    </>
  );
}

export default Register;
