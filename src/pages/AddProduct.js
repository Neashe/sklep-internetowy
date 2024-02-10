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
    
    // const {data,isLoading:isLoadingEmp,error} = useFetch(api_protected, `protected/employee`);
    const {data: categories, isLoading: isLoadingCat,error: errorCat} = useFetch(api,'products/categories');

    useEffect(()=>{
        if (!isLoggedIn){
            navigate("/login");
        }
        if (userRole && userRole.type !== "employee"){
            navigate("/");
        }
    },[])
    // useEffect(() => {
    //     if (!jwtToken) {
    //         navigate("/login");
    //         return;
    //     }
    //     fetch("http://localhost:5000/protected/employee", {
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Bearer ${jwtToken}`,
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         }
    //         throw res.json()
    //     })
    //     .then(data => {
    //         console.log(data)
    //     })
    //     .catch(errorPromise =>{
    //         console.log(errorPromise)
    //         errorPromise.then(error => {
    //             if(error.msg == "Token has expired"){
    //                 localStorage.removeItem("jwtToken")
    //                 navigate("/")
    //             }
    //             if(error.msg == "You do not have permission to access this page."){
    //                 alert(error.msg)
    //                 navigate("/")
    //             }
    //         })
    //     })
    // }, [])

    // useEffect(() => {
    //     fetch("http://localhost:5000/products/categories", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     })
    //     .then(res => {
    //         if(res.ok){
    //             return res.json()
    //         }
    //     })
    //     .then(res => {
    //         console.log(res)
    //         setCategories(res)
    //         setProduct({"productName": "", "category": categories[0], "price": "", "quantity": "", "rating": "", "description": "", "thumbnail": ""})
    //         setIsLoading(false)
    //     })
    //     .catch(e => {
    //         console.log(e)
    //     })
    // }, [])

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