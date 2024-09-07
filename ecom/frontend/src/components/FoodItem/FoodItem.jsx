import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'
export const FoodItem = ({ id, name, price, description, image }) => {
  //const [itemCount, setItemCount] = useState(0)
  const { cartItems, addToCart, removeFromCart,url } = useContext(StoreContext)
  
  /* for retrieving items from local json no database backend
 !itemCount
            ? <img className='add' onClick={() => setItemCount(prev => prev + 1)} src={assets.add_icon_white} />
            : <div className='food-item-counter'>
              <img onClick={() => setItemCount(prev => prev - 1)} src={assets.remove_icon_red} />
              <p>{itemCount}</p>
              <img onClick={() => setItemCount(prev => prev + 1)} src={assets.add_icon_green} />
            </div>
  */
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={`${image}`} alt="" className="food-item-image" /> {/* <img src={url+"/images/"+image} /> */}
        {
          !cartItems[id]
            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} />
            : <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} />
              <p>{cartItems[id]}</p> {/* add to db */}
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
            </div>
        }
      </div>
      <div className="food-item-info">
       
          <p style={{fontWeight:'bold'}}>{name}</p>
        
        <p className="food-item-price">${price}
          &nbsp;&nbsp;<span style={{color:'grey'}}><strike>$100</strike></span>&nbsp;&nbsp;<span style={{color:'red'}}>30% OFF</span>
        </p>
        <p className='food-item-desc'>{description}</p>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
       {!cartItems[id] && <button className='btn-btn' onClick={()=> addToCart(id)}><i class="fa-solid fa-cart-shopping"></i>&nbsp;&nbsp;Add to Cart</button>}
      </div>
    </div>
  )
}
