import { Link } from "react-router-dom"
import '../styles/style.css';
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

    const {isLoggedIn,setLoggedIn, userRole} = useAuth();

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setLoggedIn(false);
    }
    return (

        <nav className="navbar">
            <div className="logo">
                <Link to="/"><h1>HOME</h1></Link>
                <input type="text" name="" id="" placeholder="searchbar" />
            </div>
            <div className="productLinks">
                <Link to="/products">PRODUCTS</Link>
                <Link to="/contact">CONTACT US</Link>
                <Link to="/basket"><img  className="icon" src={process.env.PUBLIC_URL + '/icons/cart.png'} alt="basket-icon" /></Link>

            </div>
            <div className="loginLinks">
                <Link to ={isLoggedIn ? "/profile" : "/login"}><img  className="icon" src={process.env.PUBLIC_URL + '/icons/user.png'} alt="profileIcon" /></Link>
                {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                {/* test */}
                <h3>{isLoggedIn && <p>You are logged in</p>}</h3> 
            </div>
            <div className="adminLinks">
                {/* in future should be seen only by admin/employee types */}
                {userRole !==null && <Link to="/employee">Manage account</Link>}
            </div>

        </nav>
    )
}