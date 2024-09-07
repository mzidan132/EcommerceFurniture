import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const Orders = () => {

  const url = "http://localhost:8000";
  const [orders,setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      console.log(response.data); // Log the response data
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error('Error Occured');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error Occured');
    }
  }
  
  const statusHandler = async (event, orderId) => {

    const response = await axios.post(url+'/api/order/status',{
      orderId,
      status:event.target.value 
    })
    if(response.data.success){
      await fetchAllOrders() //reload auto
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>( //useState
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item,index)=>{ //hook
                  if(index===order.items.length-1){ //if current item is the last item
                    return item.name + ' x ' +item.quantity //Items are separated by a comma, but the last item does not have a trailing comma.
                  }
                  else{
                    return item.name + ' x ' +item.quantity + ', ' //show all item amount in one line
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+''+order.address.lastName}</p>
              <div className="order-item-address">{order.address.street+","}
              <p>{order.address.city+', '+order.address.state+', '+order.address.country+', '+order.address.zipcode}</p>

            </div>
            <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select value={order.status} onChange={(event)=>statusHandler(event,order._id)}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders