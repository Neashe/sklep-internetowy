import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import useFetch from "../hooks/useFetch";
import { api_protected } from "../api/api";
import { useAuth } from "../hooks/useAuth";

function ProfileShow() {
    const [edit, setEdit] = useState(false)
    const {data:user,isPending,error} = useFetch(api_protected,'/user');
    const {isLoggedIn} = useAuth();

    const navigate = useNavigate()

    useEffect(()=> {
        if (!isLoggedIn){
            navigate("/login");
        }
    },[isLoggedIn]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        user.firstname = value;
        user.lastname = value;
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

    return (
        <div>
            {error && <h1>Sorry, couldn't fetch info </h1>}
            {isPending && <h1>Loading...</h1>}
            {(!isPending && !error) && <div className="profilePage">
                {edit ? (
                    <>
                        <input type="text" name="firstname" placeholder="firstname" onChange={handleInputChange}/>
                        <input type="text" name="lastname" placeholder="lastname" onChange={handleInputChange}/>
                        <button onClick={handleSaveProfile}>Save</button>
                    </>
                ) : (
                    <>
                        <h2>My Profile</h2>
                        <h3>Firstname: {user.firstname}</h3>
                        <h3>Lastname {user.lastname}</h3>
                        <h5>Email: {user.email}</h5>
                        <h5>{user.type}</h5>
                        <button onClick={handleEditProfile}>Edit my profile</button>
                    </>
                )}
            </div>}
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