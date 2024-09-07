import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {

  return (
    <div className=''>
      <h1 style={{ textAlign: 'center', color: 'rgb(42, 139, 236)', fontFamily: 'fantasy' }}>WE SELL FURNITURES</h1>
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="3000">
            <img src={assets.food} style={{ width: 1000, height: 500 }} className="d-block mx-auto img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5></h5>
              <p></p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={assets.foods} style={{ width: 1000, height: 500 }} className="d-block mx-auto img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5></h5>
              <p></p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={assets.header_img} style={{ width: 1000, height: 500 }} className="d-block mx-auto img-fluid" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h5></h5>
              <p></p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>


        <div className="header-contents" >
          <h2>Order Your Favourite Furnitures Here</h2>
          <p>Choose from a diverse categories featuring a luxurious array of furnitures crafted with the finest materials and artist expertise. Our mission is to satisfy your demands and elevate your homes exprience, one furniture at a time.</p>
          <button>View Menu</button>
        </div>
      </div>

    </div>
  )
}

export default Header