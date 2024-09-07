import React,{useContext,useState} from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const{token,setToken} = useContext(StoreContext)
  const navigate = useNavigate()
  const logOut =()=>{
    localStorage.removeItem("token")
    setToken()
    navigate('/')
  }
  return (

    <div className="navbar">
      {!token?<button style={{cursor:'pointer',backgroundColor:'tomato',fontSize:20}} onClick={()=>setShowLogin(true)}>SignIn</button>:<button style={{backgroundColor:'red',fontSize:20,cursor:'pointer'}} onClick={logOut}>LogOut</button>}
      <img className='logo' src={assets.logo} alt="" /><img className='profile' src={assets.profile_image} alt="" />
    </div>

  )
}

export default Navbar