import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/HomePage"
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"
import Profile from "./pages/ProfilePage"
import Employee from "./pages/AdminPage"
import Navbar from "./components/Navbar"

function App(){
    return(
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/employee" element={<Employee />} />
            </Routes>
        </BrowserRouter>
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)