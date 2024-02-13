import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import "../styles/employee.css"
import { useAuth } from "../hooks/useAuth";

export default function Employee(){
    const navigate = useNavigate()
    const {userRole, isLoggedIn} = useAuth();
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        
        if (!isLoading && userRole.type !== 'employee'){
                navigate("/");
        }
    },[isLoading])

    useEffect(() => {
        if (isLoggedIn && userRole){
            setIsLoading(false);
        }
        else if (!isLoggedIn){
            console.log("well");
            navigate("/login");
        }
    },[userRole])

    return (
        <div>
            {!isLoading && 
            <div>
                <h1>MANAGMENT TOOL</h1>
                <div className="employeeLinks">
                    <Link to="/employee/addProduct">Add new product</Link>
                    <Link to="/products">Modify products</Link>
                </div>
            </div>
            }
        </div>
    )
}