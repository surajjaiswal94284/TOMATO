import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

const List = () => {
  const url=import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]); // State to store the list of food items

  // Fetch the list of food items from the server
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // Check if the response was successful and update the state
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data");
      console.error(error); // Log the error for debugging
    }
  };

  // Remove a food item by ID
  const removeFood = async (foodId) => {
    try {
      // Optimistically update the UI by removing the item immediately
      setList(prevList => prevList.filter(item => item._id !== foodId));

      const response = await axios.delete(`${url}/api/food/remove`, { data: { id: foodId } });
      // Notify user of the result
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting item");
        fetchList(); // Refresh the list if there was an error
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item");
      console.error(error); // Log the error for debugging
      fetchList(); // Refresh the list to get the latest data
    }
  };

  // Fetch the list of food items on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Foods List</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map(item => (
                <tr key={item._id}>
                  <td>
                    {/* Display food image */}
                    <img src={`${url}/images/${item.image}`} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                  </td>
                  <td data-label="Name">{item.name}</td>
                  <td  data-label="Category">{item.category}</td>
                  <td data-label="Price">${item.price}</td>
                  <td data-label="Action">
                    {/* Button to remove food item */}
                    <button className="btn btn-danger" onClick={() => removeFood(item._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No items available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
