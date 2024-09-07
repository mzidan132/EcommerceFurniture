import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets'; // Retrieve menu from local json 

const ExploreMenu = ({ category, setCategory }) => { // Color menu tomato based on props
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
              key={index}
              className={`explore-menu-list-item ${category === item.menu_name ? 'active' : ''}`}
            >
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
