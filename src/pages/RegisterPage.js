import React, { useState } from "react";
import CryptoJS from "crypto-js"
import '../styles/register.css'

function RegisterForm() {
    const [newUser, setNewUser] = useState({ "firstname": "", "lastname": "", "email": "", "hashedPassword": "", "type": "customer" })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        if (name === "hashedPassword") {
            setNewUser((prev) => ({
                ...prev, [name]: CryptoJS.SHA256(value).toString()
            }))
        } else {
            setNewUser((prev) => ({
                ...prev, [name]: value
            }))
        }
    }

    const handleRegister = () => {
        console.log(newUser)

        fetch("http://localhost:5000/user/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser)
        })
            .then(res => {
                if (res.ok) {
                    console.log(res)
                    alert("Pomyślnie dodano nowego użytkownika")
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="register-page">
            <h1>Register</h1>
            <input type="text" name="firstname" placeholder="firstname" onChange={handleInputChange} />
            <input type="text" name="lastname" placeholder="lastname" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="email" onChange={handleInputChange} />
            <input type="password" name="hashedPassword" placeholder="password" onChange={handleInputChange} />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default function Register() {
    return (
        <div>
            <RegisterForm />
        </div>
    )
}