import {useParams} from "react-router-dom";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });

const Product = () => {

    const {id} = useParams();
    console.log("ID:" + id);
    const {data:product} = api.get(`products/${id}`);

    return ( 
        <div>
            <h1>This is the product with id: {id}</h1>
            {/* <h3>{product.productName}</h3> */}
        </div>
     );
}
 
export default Product;