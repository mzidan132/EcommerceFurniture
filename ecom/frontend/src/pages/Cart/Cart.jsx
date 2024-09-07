import React from 'react';
import './Cart.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Order Details</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Estimated Tax</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 0}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
        <div className='cart'>
      <div className='cart-items'>
        <h5>An overview of your order</h5>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.length === 0 ? (
          <p>No items in the cart.</p>
        ) : (
          food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className='cart-items-item'>
                  <img src={`${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <div className='cart-item-counter'>
                    <button onClick={() => removeFromCart(item._id)}>-</button>
                    <p>{cartItems[item._id]}</p>
                    <button onClick={() => addToCart(item._id)}>+</button>
                  </div>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
              );
            }
            return null;
          })
        )}
      </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
