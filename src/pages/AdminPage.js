import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import NavBar from "../components/NavBar";

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
            <NavBar />
            <h1>Employee Page</h1>
        </div>
    )
}