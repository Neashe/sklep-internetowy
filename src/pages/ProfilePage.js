import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

function ProfileShow() {
    const [user, setUser] = useState({"id":"", "firstname":"", "lastname":"", "email":"", "hashedPassword":"", "type":""})
    const [edit, setEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
            navigate("/login");
            return;
        }
        fetch("http://localhost:5000/user", {
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
            setUser(data)
        })
        .catch(errorPromise =>{
            errorPromise.then(error => {
                if(error.msg == "Token has expired"){
                    localStorage.removeItem("jwtToken")
                    navigate("/")
                }
            })
        })
    }, [])

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setUser((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleEditProfile = () => {
        setEdit(true)
    }

    const handleSaveProfile = () => {
        fetch(`http://localhost:5000/user/modify/${user.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                console.log(res)
            }
        })
        .catch(e => {
            console.log(e)
        })

        setEdit(false)
    }

    const handleSignOff = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div>
            {edit ? (
                <>
                    <input type="text" name="firstname" placeholder="firstname" onChange={handleInputChange}/>
                    <input type="text" name="lastname" placeholder="lastname" onChange={handleInputChange}/>
                    <button onClick={handleSaveProfile}>Save</button>
                </>
            ) : (
                <>
                    <h2>Profile</h2>
                    <h3>{user.firstname}</h3>
                    <h3>{user.lastname}</h3>
                    <h5>{user.email}</h5>
                    <h5>{user.type}</h5>
                    <button onClick={handleEditProfile}>Edit</button>
                </>
            )}
        </div>
    )
}

export default function Profile() {
    return (
        <div>
            <ProfileShow />
        </div>
    )
}