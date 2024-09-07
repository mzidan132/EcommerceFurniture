import axios from "axios"; // Imports the axios library for making HTTP requests
import { createContext, useEffect, useState } from "react"; // Imports React hooks and functions for context

// Creates a context object with a default value of null
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Initializes state for cart items as an empty object
    const [cartItems, setCartItems] = useState({});
    
    // Defines the base URL for the API
    const url = "http://localhost:8000";
    
    // Initializes state for the authentication token as an empty string
    const [token, setToken] = useState("");
    
    // Initializes state for the food list as an empty array
    const [food_list, setFoodList] = useState([]);

    // Function to add an item to the cart
    const addToCart = async (itemId) => {
        // Checks if the item is not already in the cart
        if (!cartItems[itemId]) {
            // Adds the item to the cart with a quantity of 1
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            // Increments the quantity of the existing item by 1
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // If a token exists, sends a POST request to add the item to the cart in the database
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        // Decrements the quantity of the item by 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // If a token exists, sends a POST request to remove the item from the database
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Function to calculate the total amount in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // Iterates over the cart items
        for (const item in cartItems) {
            // Checks if the quantity of the item is greater than 0
            if (cartItems[item] > 0) {
                // Finds the item in the food list
                let itemInfo = food_list.find((product) => product._id === item);
                // Adds the price of the item multiplied by its quantity to the total amount
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // Function to fetch the list of food items from the backend
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    // Function to load cart data from the backend
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    // useEffect hook to run side effects on component mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); // Fetches the food list
            // Checks if a token is stored in localStorage
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")); // Sets the token state
                await loadCartData(localStorage.getItem("token")); // Loads cart data
            }
        }
        loadData(); // Calls the loadData function
    }, []);

    // Defines the value to be provided to context consumers
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <>
            {/* Provides the context value to child components */}
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        </>
    );
};

export default StoreContextProvider;
