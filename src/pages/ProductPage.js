import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import {useCart} from "../hooks/useCart"
import {useAuth} from "../hooks/useAuth"

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });

const Product = () => {

    const {id} = useParams();
    console.log("ID:" + id);
    const {data:product,error,isPending} = useFetch(api,`products/${id}`);
    const navigator = useNavigate()

    const {state, dispatch} = useCart()
    const {isLoggedIn} = useAuth();

    const handleAddToCart = (product) => () => {
      if(isLoggedIn){
        dispatch({type: "ADD_TO_CART", payload: product})
      } else {
        navigator("/login")
      }
    }

    return ( 
        <div>
          {error && <h2>Sorry, something does not work</h2>}
          {isPending && <p>Loading...</p>}
          {product && <div>    
            <section>
              <img src={product.thumbnail} alt="product-img" />
            </section>
            <section>
              <h2>{product.productName}<span>{product.rating}</span></h2>
              <p>{product.price}</p>
              <div>
                <button onClick={handleAddToCart(product)}>Add to cart</button>
              </div>
              <hr />
              <h3>Product description</h3>
              <p>{product.description}</p>
            </section>
          </div>}

        </div>
     );
}
 
export default Product;