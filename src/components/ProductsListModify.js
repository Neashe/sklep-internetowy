import { useRef } from "react";
import "../styles/products.css";
import { useNavigate } from "react-router-dom";

const ProductListModify = ({ products, reloadPage }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleDelete = (id) => () => {
    fetch(`http://localhost:5000/products/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id)
    })
      .then(res => {
        if (res.ok) {
          console.log(res)
          console.log("Usunięto produkt")
          reloadPage()
        }
      })
      .catch(e => {
        console.log(e)
      })
    console.log(id)
  }

  const handleEdit = (id) => () => {
    navigate(`/employee/modifyProducts/${id}`)
  }

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product" key={product.productID}>
          <img src={product.thumbnail} alt="product-image" />
          <h3 className="product-name">{product.productName}</h3>
          <p className="rating">rating {product.rating}</p>
          <div className="cart">
            <h3>{product.price} $</h3>
            <button onClick={handleDelete(product.productID)}>Delete</button>
            <button onClick={handleEdit(product.productID)}>Edit</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListModify;