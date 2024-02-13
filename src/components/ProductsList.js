import "../styles/products.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart"
import {useAuth} from "../hooks/useAuth"
import { ShopContext } from "../context/shop-context.js";
import { useContext } from "react";

const ProductList = ({products}) => {

    const navigate = useNavigate();
    //state
    const { dispatch } = useCart()
    const {isLoggedIn, userRole} = useAuth();
    const {addToCart, cartItems} = useContext(ShopContext);

    const handleAddToCart = (product) => (event) => {
        event.stopPropagation()
        console.log("added");
        addToCart(product.productID);
          
        // if(isLoggedIn){
        //     dispatch({type: "ADD_TO_CART", payload: product})
        // } else {
        //     navigate("/login")
        // }
    }
    const handleEdit = (id) => (event) => {
        event.stopPropagation()
        console.log("also clicked");
        navigate(`/employee/modifyProducts/${id}`)
      }

    const handleOther = (id) => {
        console.log("yhy");
        navigate(`/products/${id}`);
        
    }
//onClick={()=>handleOther(product.productID)}
    return ( 
        <div className="products-container">
            {products.map((product)=>(
                <div  className="product" key={product.productID}>
                    <img src={product.thumbnail} alt="product" />
                    <h3 className="product-name">{product.productName}</h3>
                    <p className="rating">rating {product.rating}</p>
                    {(!userRole || userRole.type !== 'employee') && <div className="cart">
                        <h3>{product.price} $</h3>
                        <button className="btn btn-cart" onClick={addToCart(product.productID)}><img src={process.env.PUBLIC_URL + '/icons/add-to-cart.png'} alt="" /></button>
                    </div>}
                    {(userRole && userRole.type === 'employee') && <div className="mod">
                        <button onClick={handleEdit(product.productID)} className="btn btn">Edit product</button>
                    </div>}
                </div>
            ))}
        </div>
     );
}
 
export default ProductList;