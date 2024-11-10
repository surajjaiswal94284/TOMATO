import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const url=import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const { token } = useContext(StoreContext);

  // Function to fetch orders
  const fetchOrders = async () => {
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);  
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Render individual order items
  const renderOrderItems = (items) => {
    return items.map((item) => `${item.name} x ${item.quantity}`).join(', ');
  };

  return (
    <div className='my-orders'>
      <h2 className='text-center'>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p className='text-center'>No orders found.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="Order Icon" />
              <p>{renderOrderItems(order.items)}</p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
