import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import "../styles/employee.css"

export default function Employee(){
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const [product, setProduct] = useState({"productName": "", "category": "", "price": "", "quantity": "", "rating": "", "description": "", "thumbnail": ""})
    
    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate("/login");
            return;
        }
        fetch("http://localhost:5000/protected/employee", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw res.json()
        })
        .then(data => {
            console.log(data)
            setIsLoading(false)
        })
        .catch(errorPromise =>{
            console.log(errorPromise)
            errorPromise.then(error => {
                if(error.msg == "Token has expired"){
                    localStorage.removeItem("jwtToken")
                    navigate("/")
                }
                if(error.msg == "You do not have permission to access this page."){
                    alert(error.msg)
                    navigate("/")
                }
            })
        })
    }, [])

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
        const {name, value} = event.target
        setProduct((prev) => ({
            ...prev, [name]: value
        }))
    } 

    if(isLoading){
        return
    }


    return (
        <div className="addProduct">
            <div className="addProductForm">
                <h1>Add new product</h1>
                <label>Product Name</label>
                <input type="text" name="productName" placeholder="Product Name" onChange={handleInputChange}/>
                <label>Category</label>
                <select id="category" name="category" onChange={handleInputChange}>
                    <option value=""></option>
                    <option value="Electronics">Electronics</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                </select>
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
            </div>
        </div>
    )
}