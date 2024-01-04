import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import CryptoJS from "crypto-js";

function LoginForm() {
    const [email, setEmail] = useState('')
    const [hashedPassword, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        console.log(email, hashedPassword)

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
                navigate("/")
            })
            .catch(e => {
                console.log('Login error:', e)
            })
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
            <input type="password" name="hashedPassword" placeholder="password" onChange={e => setPassword(CryptoJS.SHA256(e.target.value).toString())} />
            <button onClick={handleLogin}>Sign in</button>
        </div>
    )
}

export default function Login() {
    return (
        <div>
            <LoginForm />
        </div>
    )
}