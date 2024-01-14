import {useParams} from "react-router-dom";
import axios from "axios";

const Product = () => {

    const id = useParams();
    const {data:product} = axios.get("products/product/"+id);

    return ( 
        <div>
            <h1>This is the product with id: {id}</h1>
        </div>
     );
}
 
export default Product;