import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets} from '../../assets/assets';
import './Orders.css';

const Order = () => {
  const url=import.meta.env.VITE_API_URL;
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error retrieving orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${url}/api/order/status`, { orderId, status: newStatus });
      if (response.data.success) {
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success("Order status updated successfully");
      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      toast.error("Error updating order status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="container my-4">
      <h3 className="text-center">Order Page</h3>
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="row g-0">
                <div className="col-md-2 d-flex align-items-center justify-content-center">
                  <img src={assets.parcel_icon} alt="Parcel Icon" className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {order.address.firstName} {order.address.lastName}
                    </h5>
                    <p className="card-text order-item-food">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x {item.quantity}
                          {idx < order.items.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </p>
                    <p className="card-text order-item-address">
                      {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                    </p>
                    <p className="card-text order-item-phone">
                      <strong>Phone:</strong> {order.address.phone}
                    </p>
                    <p className="card-text">
                      <strong>Total Items:</strong> {order.items.length}
                    </p>
                    
                    
                      <div className="form-group mt-2">
                        <label><strong>Status:</strong></label>
                        <select
                          className="form-select mt-1"
                          value={order.status || "Preparing"}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="Preparing">Preparing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                  </div>
                </div>
                <div className="col-md-2 d-flex flex-column align-items-center justify-content-center">
                  <p className="mb-1"><strong>Amount:</strong> ${order.amount}</p>
                  <p className={`mb-1 ${order.payment ? 'text-success' : 'text-danger'}`}>
                    {order.payment ? 'Paid' : 'Not Paid'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Order;
