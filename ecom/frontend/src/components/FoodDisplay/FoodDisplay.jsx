import React, { useContext,useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import { FoodItem } from '../FoodItem/FoodItem';
import ExploreMenu from '../ExploreMenu/ExploreMenu';  // Import the vertical navbar

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext); // food_list array
  const [category, setCategory] = useState('All');
  return (
    <div className='layout'>
      
      <ExploreMenu category={category} setCategory={setCategory} />
      
      <div className='food-display'>
        
        <div className="food-display-list">
          {food_list.map((item, index) => {
            if (category === 'All' || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null; // Added null return for items not in the category
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
