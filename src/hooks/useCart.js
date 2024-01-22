import React, {createContext, useContext, useReducer, useEffect} from "react"

const CartContext = createContext()

const loadCartFromStorage = () => {
    const cartFromStorage = localStorage.getItem("cart")
    return cartFromStorage ? JSON.parse(cartFromStorage) : []
}

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart))
}

const initialCartState = {
    cart: loadCartFromStorage(),
}

const cartReducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            const updatedCartAdd = [...state.cart, action.payload]
            saveCartToStorage(updatedCartAdd)
            return {...state, cart: updatedCartAdd}
        case "REMOVE_FROM_CART":
            const indexToRemove = state.cart.findIndex((item) => item.productID === action.payload);

            if (indexToRemove !== -1) {
                const updatedCartRemove = [
                    ...state.cart.slice(0, indexToRemove),
                    ...state.cart.slice(indexToRemove + 1),
                ];
                saveCartToStorage(updatedCartRemove);
                return { ...state, cart: updatedCartRemove }
            }
        case "CLEAR_CART":
            const clearedCart = []
            saveCartToStorage(clearedCart)
            return {...state, cart: clearedCart}
        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        saveCartToStorage(state.cart)
    }, [state.cart])

    return (
        <CartContext.Provider value={{state, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if(!context){
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}