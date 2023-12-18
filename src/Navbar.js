import { Link } from "react-router-dom";

function Navbar() {

    return (
        <nav className="navbar">
            <h2>Szop Shop</h2>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/products">Products</Link>
                <Link to="register">Register</Link>
                <Link to="login">Login</Link> 
            </div>
        </nav>
    )

}

export default Navbar;