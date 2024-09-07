import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Footer = () => {
  return (
    <>
     <footer id='footer'>
        <div className="footer-container">
            <div className="footer-section logo-section">
                <div style={{display:'flex'}}>
                <img src={assets.furniflex} alt="FurniFlex Logo" className="footer-logo" /><span className="logoh">Furni<span style={{color:'rgb(42, 139, 236)'}}>Flex</span></span>
                </div>
            </div>

            <div className="footer-section about-section">
                <h4>About US</h4>
                <ul>
                    <li><a href="#">Master Plan</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Invest</a></li>
                    <li><a href="#">Pressroom</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

            <div className="footer-section explore-section">
                <h4>Explore EEVE</h4>
                <ul>
                    <li><a href="#">Unlock my Robot Power</a></li>
                    <li><a href="#">Starlight</a></li>
                    <li><a href="#">Robot Platform</a></li>
                    <li><a href="#">EEVE Roadmap</a></li>
                </ul>
            </div>

            <div className="footer-section community-section">
                <h4>Community & Support</h4>
                <ul>
                    <li><a href="#">Willow X Community</a></li>
                    <li><a href="#">Developer & Maker Access</a></li>
                    <li><a href="#">Special Cases</a></li>
                </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="social-icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
            <div className="footer-links">
                <a href="#">March22 Recap</a>
                <a href="#">Privacy Policy</a>
                <a href="#">General Terms</a>
                <a href="#">Contact</a>
            </div>
            <div className="footer-country">
                <img src={assets.usa} alt="United States" />
                <span>United States (English)</span>
            </div>
        </div>

        <div className="footer-copyright">
            <p>EEVE © 2024. All rights reserved.</p>
        </div>
    </footer>
    </>
  )
}

export default Footer