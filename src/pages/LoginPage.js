import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import CryptoJS from "crypto-js";
import '../styles/login.css';
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

function LoginForm() {
    const [email, setEmail] = useState('')
    const [hashedPassword, setPassword] = useState('')
    const navigate = useNavigate()
    const {setLoggedIn} = useAuth();

    const handleLogin = () => {

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, hashedPassword })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then((data) => {
                        console.log(data.msg)
                    })
                }
            })
            .then(data => {
                localStorage.setItem("jwtToken", data.token)
                setLoggedIn(true)
                navigate("/")
            })
            .catch(e => {
                console.log('Login error:', e)
            })
    }

    const handleNavigate = () => {
        navigate("/register");
    }

    return (
        <div className="login-register">
            <section className="login">
                <h1>LOGIN</h1>
                <input className="login-input" type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <input className="login-input" type="password" name="hashedPassword" placeholder="password" onChange={e => setPassword(CryptoJS.SHA256(e.target.value).toString())} />
                <button className="log-btn signin" onClick={handleLogin}>SIGN IN</button>
            </section>

            <section className="register">
                <h1>DONT'T HAVE AN ACCOUNT YET?</h1>
                <button className="log-btn signup" onClick={handleNavigate}>SIGN UP</button>
            </section>
        </div>
    )
}

export default function Login({setLoggedIn}) {
    return (
        <div>
            <LoginForm setLoggedIn={setLoggedIn} />
        </div>
    )
}