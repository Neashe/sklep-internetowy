import React from "react";
import "../styles/style.css"
import { useNavigate } from "react-router-dom";
export default function Home(){

    const navigate = useNavigate();
    
    const navigateToProducts = () =>{
        navigate("/products");
    }

    return (
        <div>
            <section className="hero">
                <h1 className="title">To jest przykładowa strona sklepu</h1>
                <p className="page-desc">Przykładowy slogan</p>
                <button className="btn to-products btn-red" onClick={navigateToProducts}>Przejdz do produktow</button>
            </section>
        </div>
    )
}