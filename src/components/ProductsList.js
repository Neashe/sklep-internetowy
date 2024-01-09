import "../styles/products.css";
//returns list of products

// class Product(db.Model):
//     productID = db.Column(db.Integer, primary_key=True)
//     productName = db.Column(db.String(100))
//     category = db.Column(db.String(50))
//     price = db.Column(db.Double)
//     quantity = db.Column(db.Integer)
//     rating = db.Column(db.Double)
//     description = db.Column(db.String(250))
//     thumbnail = db.Column(db.String(100))

const ProductList = ({products}) => {

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
                    <h3>{product.productName}</h3>
                    <h3 className="product-price">{product.price}</h3>
                    <p>rating {product.rating}</p>
                    <button onClick={handleAddToCart}>Add to cart</button>
                </div>
            ))}
        </div>
     );
}
 
export default ProductList;