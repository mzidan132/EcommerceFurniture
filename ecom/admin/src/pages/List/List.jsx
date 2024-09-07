import React, { useEffect, useState } from 'react';
import './List.css';
import { toast } from 'react-toastify';
//import axios from 'axios
const List = () => {
  const url = 'http://localhost:8000'
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await fetch(`${url}/api/food/list`);
      const result = await response.json(); // Call json() to parse the response

      console.log(result.data);

      if (result.success) { // Use result instead of response
        setList(result.data); // Update list with result.data
      } else {
        toast.error('Error occurred');
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };
  /*const List = () => {
    const url = 'http://localhost:8000';
    const [list, setList] = useState([]);
  
    const fetchList = async () => {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success){
        setList(response.data.data)
      }
      else
      {
        toast.error("Error")
      }
    }
    */
  useEffect(() => {
    fetchList();
  }, []);

  /*
  const removeFood = async(foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if (response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  }
  */

  const removeFood = async (foodId) => {
    try {
      const response = await fetch(`${url}/api/food/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: foodId }), // Send data as JSON
      });

      const result = await response.json(); // Call json() to parse the response

      if (result.success) {
        toast.success(result.message || 'Food item removed successfully');
        await fetchList(); // Refresh the list after removal
      } else {
        toast.error('Error occurred: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      toast.error('An error occurred: ' + error.message);
    }
  };
  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => { //array
          return (<>
            <div key={index} className='list-table-format'>
              <img src={`${item.image}`} alt="" /> {/* <img src={url+"/images/"+item.image} /> */}
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>

            </div> </>
          )
        })}
      </div>
    </div>
  )
}
export default List;