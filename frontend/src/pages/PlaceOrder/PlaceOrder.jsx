import React, { useContext, useState,useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
    const { token, food_list, cartItems } = useContext(StoreContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const totalAmount = parseFloat(queryParams.get('total')) || 0;
    const url=import.meta.env.VITE_API_URL;

    const navigate=useNavigate();

    const [deliveryInfo, setDeliveryInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct orderItems with item details and quantities
        const orderItems = food_list
            .filter(item => cartItems[item._id] > 0)
            .map(item => ({
                ...item,
                quantity: cartItems[item._id]
            }));

        const orderData = {
            userId: token,  
            items: orderItems,
            amount: totalAmount,
            address: deliveryInfo
        };
        try {
            const response = await axios.post(
                `${url}/api/order/place`,  // Backend URL
                orderData,{headers:{token}}
            );

            const result = response.data;
            console.log(result);
            if (result.success) {
                window.location.href = result.session_url;  // Redirect to Stripe checkout
            } else {
                alert("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again.");
        }
    };

    useEffect(()=>{
        if(!token){
            navigate("/cart");
        }else if(totalAmount==0){
            navigate("/cart");
        }
    },[token]);

    return (
        <div className="container mt-5 p-3">
            <h2 className="text-center  head mt-5">Delivery Information</h2>
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="First Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Last Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <input
                            type="text"
                            name="street"
                            className="form-control"
                            placeholder="Street Address"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="City"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="state"
                            className="form-control"
                            placeholder="State"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="zip"
                            className="form-control"
                            placeholder="Zip Code"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="country"
                            className="form-control"
                            placeholder="Country"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Phone"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <h4 className="mt-4">Cart Total</h4>
                <p>Total Amount: ${totalAmount.toFixed(2)}</p>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ backgroundColor: 'tomato' }}
                >
                    Confirm Order
                </button>
            </form>
        </div>
    );
};

export default PlaceOrder;
