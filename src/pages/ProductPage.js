import {useParams} from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";

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
                <button>Add to cart</button>
              </div>
              <hr />
              <h3>Product description</h3>
              <p>{product.description}</p>
            </section>
            {console.log(product)}
            {console.log(error)}
            {console.log(isPending)}
          </div>}

        </div>
     );
}
 
export default Product;