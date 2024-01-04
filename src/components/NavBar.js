import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      'Content-Type': 'application/json',
    },
  });

export default function NavBar() {

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

        <div>
            <Link to="/">Home</Link>
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/register">Register</Link>}
            {userRole !==null && <Link to="/employee">Employee</Link>}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

        </div>




        // <div className="Nav">
        //     {localStorage.length == 0 ? (
        //         <>
        //             <Link to="/">Home</Link>
        //             <Link to="/login">Login</Link>
        //             <Link to="/register">Register</Link>
        //             <Link to="/employee">Employee</Link>
        //         </>
        //     ) : (
        //         <>
        //             <Link to="/">Home</Link>
        //             <Link to="/login">Login</Link>
        //             <Link to="/register">Register</Link>
        //             <Link to="/employee">Employee</Link>
        //             <Link to="/profile">Profile</Link>
        //         </>
        //     )}
        // </div>
    )
}