import React, { useContext } from 'react';
import './FoodDisplay.css';
import  {StoreContext}  from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='container'>
      <h2>Top Dishes near you</h2>
      <div className="row">
        {food_list
          .filter(item => category === "All" || category === item.category) // Filter based on category
          .map(item => (
            <FoodItem 
              key={item._id}
              image={item.image} 
              name={item.name} 
              desc={item.description} 
              price={item.price} 
              id={item._id} 
            />
          ))
        }
      </div>
    </div>
  );
};

export default FoodDisplay;
