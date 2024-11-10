import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const url=import.meta.env.VITE_API_URL;
    const { cartItems,food_list, removeFromCart } = useContext(StoreContext);

    // Function to calculate the total price of an item
    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    // Filter food_list to include only items in the cart
    const cartItemsList = food_list.filter(food => cartItems[food._id]);

    // Calculate subtotal
    const subtotal = cartItemsList.reduce((acc, item) => {
        return acc + calculateTotalPrice(item.price, cartItems[item._id]);
    }, 0);

    // Define a fixed delivery fee
    const deliveryFee = 5;

    // Calculate total amount
    const totalAmount = subtotal + deliveryFee;


    return (
        <div className="container mt-5 p-3">
            <h2 className="text-center mt-5 head">Your Shopping Cart</h2>

            {cartItemsList.length > 0 ? (
                <>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItemsList.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <img src={url+'/images/'+item.image} alt={item.name} style={{ width: '50px' }} />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>{cartItems[item._id]}</td>
                                        <td>${calculateTotalPrice(item.price, cartItems[item._id]).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-totals mb-3">
                        <h4>Cart Totals</h4>
                        <p className="small-text">Subtotal: ${subtotal.toFixed(2)}</p>
                        <p className="small-text">Delivery Fee: ${deliveryFee.toFixed(2)}</p>
                        <p className="small-text">Total Amount: ${totalAmount.toFixed(2)}</p>
                    </div>

                    <Link to={`/order?total=${totalAmount}`}>
                        <button className="btn proceed-btn w-100" style={{ backgroundColor: 'tomato' }}>
                            Proceed to Pay
                        </button>
                    </Link>

                </>
            ) : (
                <p className='text-center'>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
