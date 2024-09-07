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

    

    // useEffect hook to run side effects on component mount
    useEffect(() => {
        async function loadData() {
           
            // Checks if a token is stored in localStorage
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")); // Sets the token state
              
            }
        }
        loadData(); // Calls the loadData function
    }, []);

    // Defines the value to be provided to context consumers
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
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
