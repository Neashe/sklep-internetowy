import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import "../styles/employee.css"
import {api_protected,api} from "../api/api";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../hooks/useAuth";

export default function Employee(){
    const navigate = useNavigate()
    const [product, setProduct] = useState({"productName": "", "category": "", "price": "", "quantity": "", "rating": "", "description": "", "thumbnail": ""})
    const [newCategory, setNewCategory] = useState(false)
    const {userRole, isLoggedIn} = useAuth();
    
    const {data: categories, isLoading: isLoadingCat,error: errorCat} = useFetch(api,'products/categories');

    useEffect(()=>{
        if (!isLoggedIn){
            navigate("/login");
        }
        if (userRole && userRole.type !== "employee"){
            navigate("/");
        }
    },[])

    const handleAddProduct = () => {
        console.log(product)

        fetch("http://localhost:5000/products", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
        .then(res =>{
            if (res.ok){
                console.log(res)
                alert("Pomyślnie dodano nowy produkt")
            }
        })
        .catch(e => {
            console.log(e)
        })
    }

    const handleInputChange = (event) => {
        const {name, value, type} = event.target
        setProduct((prev) => ({
            ...prev, [name]: value
        }))

        if(name == "category"){
            if(value == "NEW_CATEGORY" || type == "text")
                setNewCategory(true)
            else {
                setNewCategory(false)
            }
        }
    } 

    return (
        <div className="addProduct">
            {isLoadingCat && <p>Loading...</p>}
            {categories && <div className="addProductForm">
                <h1>Add new product</h1>
                <label>Product Name</label>
                <input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange}/>
                <label>Category</label>
                <select id="category" name="category" onChange={handleInputChange} value={product.category}>
                    {categories.map((category) => {
                        return <option value={category} key={category}>{category}</option>
                    })}
                    <option name="category" value="NEW_CATEGORY">New category</option>
                </select>
                {newCategory && (
                    <>
                        <label>New category</label>
                        <input type="text" name="category" placeholder="New category name" onChange={handleInputChange}/>
                    </>
                )}
                <label>Price</label>
                <input type="text" name="price" placeholder="Price" onChange={handleInputChange}/>
                <label>Quantity</label>
                <input type="text" name="quantity" placeholder="quantity" onChange={handleInputChange}/>
                <label>Rating</label>
                <input type="text" name="rating" placeholder="Rating" onChange={handleInputChange}/>
                <label>Description</label>
                <textarea name="description" onChange={handleInputChange}></textarea>
                <label>Thumbnail</label>
                <input type="text" name="thumbnail" placeholder="thumbnail" onChange={handleInputChange}/>
                <button onClick={handleAddProduct}>Add new product</button>
            </div>}
        </div>
    )
}