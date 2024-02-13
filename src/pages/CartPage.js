import React, { useContext } from "react"
import { useCart } from "../hooks/useCart"
import "../styles/cart.css"
import { ShopContext } from "../context/shop-context"
import useFetch from "../hooks/useFetch"
import { api } from "../api/api"
import CartItem from "../components/cartItem"

// function Cart() {
//     const {state, dispatch} = useCart()
    
//     const handleRemoveFromCart = (id) => () => {
//         console.log(id)
//         dispatch({type: "REMOVE_FROM_CART", payload: id})
//     }

//     console.log('state'+state.cart);
//     console.log('dispatch'+dispatch);
//     return (
//         <div className="shoppingCart">
//             <h1>Shopping Cart</h1>
//             {state.cart.map((product) => (
//                 <div className="productCart" key={product.productId}>
//                     <h2>{product.productName}</h2>
//                     <img src={product.thumbnail} alt="productImage"></img>
//                     <p>{product.price}</p>
//                     <button onClick={handleRemoveFromCart(product.productID)}>Delete</button>
//                 </div>
//             ))}
//             {state.cart.length != 0 ? <button>Pay</button> : <></>}
//         </div> 
//      );
// }

const Cart = () => {

    const {cartItems} = useContext(ShopContext);
    const {data:products,isPending,error} = useFetch(api,'/products');
    console.log(cartItems);
    
    return ( 
    <div>
        <h1>Your cart items</h1>
        {!cartItems && <h2>Your cart is empty</h2>}
        {(!isPending && !error) && <div className="cart-items">
            {products.map((product)=>{
                if (cartItems[product.productID] !== 0){
                    return <CartItem product={product} amount={cartItems[product.productID]}></CartItem>
                }
            })}
        </div>}
    </div> );
}
 
export default Cart;
 
// export default Cart;