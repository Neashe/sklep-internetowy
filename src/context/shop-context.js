import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { api } from "../api/api";

export const ShopContext = createContext(null);

const getDefaultCart = (product_ids) => {
    
    let cart = {};
    for (const id of product_ids){
        cart[id] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props) => {
    const {data,isPending,error} = useFetch(api,'/products/ids');
    const [cartItems, setCartItems] = useState({});

    useEffect(()=>{
        if (data){
            setCartItems(getDefaultCart(data.product_ids));
        }
    },[data]);

    const addToCart = (productID) => () => {
        console.log("huhuhuhu");
        setCartItems((prev) => ({...prev,[productID]:prev[productID]+1}))
    }

    const removeFromCart = (productID) => {
        setCartItems((prev) => ({...prev,[productID]:prev[productID]-1}))
    }

    const contextValue = {cartItems,addToCart,removeFromCart};

    return <ShopContext.Provider value={contextValue} >{props.children}</ShopContext.Provider>
}

