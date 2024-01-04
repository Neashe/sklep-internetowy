import React from "react";
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <div className="Nav">
            {localStorage.length == 0 ? (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/employee">Employee</Link>
                </>
            ) : (
                <>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/employee">Employee</Link>
                    <Link to="/profile">Profile</Link>
                </>
            )}
        </div>
    )
}