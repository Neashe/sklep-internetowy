import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/employee.css"

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    'Content-Type': 'application/json',
  },
});

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [prod, setProd] = useState({
    "productName": "",
    "category": "",
    "price": "",
    "quantity": "",
    "rating": "",
    "description": "",
    "thumbnail": ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`products/${id}`);
        setProduct(response.data);
        setProd(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProd((prev) => ({
      ...prev, [name]: value
    }));
  }

  const handleEditProduct = () => {
    fetch(`http://localhost:5000/products/modify/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(prod)
    })
    .then(res => {
        if(res.ok){
            console.log("Pomyślnie zmodyfikowano produkt")
            window.location.reload();
        }
    })
    .catch(e => {
        console.log(e)
    })
  }

  return (
    <div>
      {product && prod && (
        <div className="productId">
          <div className="productInfo">
            <h1>{product.productName}</h1>
            <img src={product.thumbnail} alt="productImage" />
            <p>{product.category}</p>
            <p>{product.price}</p>
            <p>{product.quantity}</p>
            <p>{product.rating}</p>
            <p>{product.description}</p>
          </div>
          <div className="productEdit">
            <div className="productEditForm">
              <h1>Edit product</h1>
              <label>Product Name</label>
              <input type="text" name="productName" value={prod.productName} onChange={handleInputChange} />
              <label>Category</label>
              <select id="category" name="category" value={prod.category} onChange={handleInputChange}>
                <option value=""></option>
                <option value="Electronics">Electronics</option>
                <option value="Appliances">Appliances</option>
                <option value="Sports & Outdoors">Sports & Outdoors</option>
              </select>
              <label>Price</label>
              <input type="text" name="price" value={prod.price} onChange={handleInputChange} />
              <label>Quantity</label>
              <input type="text" name="quantity" value={prod.quantity} onChange={handleInputChange} />
              <label>Rating</label>
              <input type="text" name="rating" value={prod.rating} onChange={handleInputChange} />
              <label>Description</label>
              <textarea name="description" value={prod.description} onChange={handleInputChange}></textarea>
              <label>Thumbnail</label>
              <input type="text" name="thumbnail" value={prod.thumbnail} onChange={handleInputChange} />
              <button onClick={handleEditProduct}>Edit product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;