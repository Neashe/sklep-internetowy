import React, {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom"
import "../styles/employee.css"

export default function Employee(){
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    
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

    if(isLoading){
        return
    }

    return (
        <div>
            <h1>MANAGMENT TOOL</h1>
            <div className="employeeLinks">
                <Link to="/employee/addProduct">Add new product</Link>
                <Link to="/employee/modifyProducts">Modify products</Link>
            </div>
        </div>
    )
}