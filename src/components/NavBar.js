import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import '../styles/style.css';

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      'Content-Type': 'application/json',
    },
  });

export default function Navbar() {

    const [isLoggedIn,setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));
    const [userRole, setUserRole] = useState();

    useEffect(()=>{
        console.log("test useEffect navbar");
        const fetchUserRole = async () => {
            try {
                const response = await api.get('user/type');
                setUserRole(response.data);
            }
            catch (error){
                console.error('Error fetching user role:',error);
            }
        };
        if (isLoggedIn){
            fetchUserRole();
        }
        else{
            setUserRole(null);
        }
    },[isLoggedIn])

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setLoggedIn(false);
    }
    return (

        <nav className="navbar">
            <div className="logo">
                <Link to="/"><h1>HOME</h1></Link>
                <input type="text" name="" id="" placeholder="searchbar" />
            </div>
            <div className="productLinks">
                <Link to="/products">PRODUCTS</Link>
                <Link to="/contact">CONTACT US</Link>
                <Link to="/basket"><img  className="icon" src={process.env.PUBLIC_URL + '/icons/cart.png'} alt="basket-icon" /></Link>

            </div>
            <div className="loginLinks">
                <Link to ="/login"><img  className="icon" src={process.env.PUBLIC_URL + '/icons/user.png'} alt="profileIcon" /></Link>
                {!isLoggedIn && <Link to="/login">Login</Link>}
                {!isLoggedIn && <Link to="/register">Register</Link>}
                {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                <h3>{isLoggedIn}</h3>
                {console.log(isLoggedIn)}
            </div>
            <div className="adminLinks">
                {/* {userRole !==null && <Link to="/employee">Employee</Link>} */}
            </div>

        </nav>
    )
}