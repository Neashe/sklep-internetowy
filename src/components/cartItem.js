import { useContext } from "react";
import { ShopContext } from "../context/shop-context";

const CartItem = ({product,amount}) => {
    const {addToCart,removeFromCart,cartItems} = useContext(ShopContext);

    
    // console.log(item);
    console.log(amount);
    return ( 
        <div className="cart-item">
            <img src={product.thumbnail} alt="" />
            <h1>{product.productName}</h1>
            <div className="count-handler">
                <button onClick={()=>removeFromCart(product.productID)}>-</button>
                <input type="number" value={cartItems[product.productID]}/>
                <button onClick={addToCart(product.productID)}>+</button>
            </div>
            <h3>{product.price*amount}$</h3>
            <div></div>
        </div>
     );
}
 
export default CartItem;