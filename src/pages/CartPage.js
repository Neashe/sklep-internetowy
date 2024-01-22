import React from "react"
import { useCart } from "../hooks/useCart"
import "../styles/cart.css"

function Cart() {
    const {state, dispatch} = useCart()
    
    const handleRemoveFromCart = (id) => () => {
        console.log(id)
        dispatch({type: "REMOVE_FROM_CART", payload: id})
    }

    return (
        <div className="shoppingCart">
            <h1>Shopping Cart</h1>
            {state.cart.map((product) => (
                <div className="productCart" key={product.productId}>
                    <h2>{product.productName}</h2>
                    <img src={product.thumbnail} alt="productImage"></img>
                    <p>{product.price}</p>
                    <button onClick={handleRemoveFromCart(product.productID)}>Delete</button>
                </div>
            ))}
            {state.cart.length != 0 ? <button>Pay</button> : <></>}
        </div> 
     );
}
 
export default Cart;