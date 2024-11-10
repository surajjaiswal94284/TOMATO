import { createContext, useEffect, useState } from "react";
import axios from 'axios';

// Create the StoreContext with a default value of `null`.
// This context will provide data and functions to all components that consume it.
export const StoreContext = createContext(null);

// Define the StoreContextProvider component, which wraps around children components 
// and provides them with shared data and state management.
const StoreContextProvider = (props) => {
    const url=import.meta.env.VITE_API_URL;
    // State to manage items in the cart, initialized as an empty object.
    const [cartItems, setCartItems] = useState({});
    
    // State to manage user authentication token, initialized as an empty string.
    const [token, setToken] = useState('');
    
    // State to store a list of food items, initialized as an empty array.
    const [food_list, setFoodList] = useState([]);
    
    // State to handle loading and error states
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // For potential errors
    
    // Function to check if the token is expired by making a test request to the backend
    const checkTokenExpiration = async () => {
        try {
            await axios.get(`${url}/api/test`, {
                headers: { token }
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // If token is expired, clear the token and trigger login
                setToken('');
                localStorage.removeItem('token');
            }
        }
    };

    // Fetches the list of food items from the server and sets it to `food_list` state.
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data); // Populate `food_list` with response data
        } catch (error) {
            console.error("Error fetching food list:", error);
            setError("Failed to fetch food list."); // Set error message on failure
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/data`, {}, { headers: { token } });
            setCartItems(response?.data?.cartData || {}); // Safely access cartData
        } catch (err) {
            console.error("Error fetching cart data:", err);
            setError("Failed to fetch cart data.");
        }
    };

    // useEffect hook to run once on component mount.
    useEffect(() => {
        // Load the saved token from localStorage, if any, and set it in the state.
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }

        // Load the food list from the server by calling `fetchFoodList`.
        const loadData = async () => {
            setLoading(true); // Set loading to true while data is being fetched
            await fetchFoodList();
            await loadCartData(savedToken);
            setLoading(false); // Set loading to false once data is loaded
        };

        loadData();
    }, []);

    // Function to add an item to the cart.
    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (token) {
            try {
                // Perform the API call to add the item to the cart
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error adding item to cart:', error);
                setError("Failed to add item to cart."); // Set error on failure
            }
        }
    };

    // Function to decrease the quantity of an item in the cart.
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            try {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            } catch (error) {
                console.error('Error removing item from cart:', error);
                setError("Failed to remove item from cart."); // Set error on failure
            }
        }
    };

    // Context value containing state and functions for managing food items, cart, and authentication token.
    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        setCartItems,
        token,
        setToken,
        loading, // Expose loading state to the consumers
        error, // Expose error state to the consumers
        checkTokenExpiration
    };

    // Return the context provider, passing down `contextValue` to all children components.
    return (
        <StoreContext.Provider value={contextValue}>
            {loading ? <div>Loading...</div> : error ? <div>{error}</div> : props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider; // Export the provider to wrap the app or specific components.
