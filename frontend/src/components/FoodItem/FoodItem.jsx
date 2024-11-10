import React, { useContext } from 'react';
import './FoodItem.css';
import { Card } from 'react-bootstrap';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, image, name, desc, price }) => {
    const url = import.meta.env.VITE_API_URL;
    const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

    // Ensure cartItems is an object and has the current item id
    const itemInCart = cartItems && cartItems[id];

    return (
        <div className="col-md-3 mb-4">
            <Card className="food-item h-100">
                <div className="card-image-container">
                    <Card.Img variant="top" src={url + '/images/' + image} alt={name} className="food-item-image" />
                    <div className="icon-overlay">
                        {!itemInCart ? (
                            <img 
                                src={assets.add_icon_white} 
                                onClick={() => addToCart(id)} 
                                alt="" 
                                className="icon" 
                            />
                        ) : (
                            <div className="icon-count">
                                <img 
                                    src={assets.remove_icon_red} 
                                    alt="" 
                                    onClick={() => removeFromCart(id)}
                                    className="icon"
                                />
                                <p className="count-text">{itemInCart}</p>
                                <img 
                                    src={assets.add_icon_green} 
                                    alt="" 
                                    onClick={() => addToCart(id)}
                                    className="icon"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="food-item-desc">
                        {desc}
                    </Card.Text>
                    <Card.Text className="food-item-price">
                        ${price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FoodItem;
