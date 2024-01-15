import "../styles/products.css";
import { useNavigate } from "react-router-dom";

const ProductList = ({products}) => {

    const navigate = useNavigate();
    const handleAddToCart = (event) => {
        event.stopPropagation();
        console.log("button");
    }

    const handleOther = () => {
        console.log("product");
        
    }

    return ( 
        <div className="products-container" onClick={handleOther}>
            {products.map((product)=>(
                <div className="product" key={product.productID}>
                    <img src={product.thumbnail} alt="product-image" />
                    <h3 className="product-name">{product.productName}</h3>
                    <p className="rating">rating {product.rating}</p>
                    <div className="cart">
                        <h3>{product.price} $</h3>
                        <button onClick={handleAddToCart}><img src={process.env.PUBLIC_URL + '/icons/add-to-cart.png'} alt="" /></button>

                    </div>
                </div>
            ))}
        </div>
     );
}
 
export default ProductList;