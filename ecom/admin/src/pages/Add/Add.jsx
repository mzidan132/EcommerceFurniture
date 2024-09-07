import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Add = () => {
  const url = "http://localhost:8000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Rocking chair",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (image) {
      // Upload the image to ImageBB
      const imageFormData = new FormData();
      imageFormData.append('image', image);

      try {
        const imageUploadResponse = await axios.post(
          'https://api.imgbb.com/1/upload?key=3535a83869f4d9396d9c5cf9450b0033',
          imageFormData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        const image = imageUploadResponse.data.data.url;

        // Send food details along with the image URL to your backend
        const response = await axios.post(`${url}/api/food/add`, {
          ...data,
          image, // Include the image URL here
        });

        if (response.data.success) {
          setData({
            name: "",
            description: "",
            price: "",
            category: "Rocking chair",
          });
          setImage(null);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while adding the food.');
      }
    } else {
      toast.error('Please upload an image.');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img className='image' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select className='selectt' onChange={onChangeHandler} name="category">
              <option value="Rocking chair">Rocking Chair</option>
              <option value="Side chair">Side Chair</option>
              <option value="Lounge chair">Lounge Chair</option>
              
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input className='inputclasa' onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Add;
