import { Link, useNavigate } from "react-router-dom"
import '../styles/navbar.css';
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart"

export default function Navbar() {

    const {isLoggedIn,setLoggedIn, userRole} = useAuth();
    const {state, dispatch} = useCart()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        dispatch({type: "CLEAR_CART"})
        setLoggedIn(false);
        navigate('/')
    }
    
    return (
        <div>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/"><h1>HOME</h1></Link>
                    <input type="text" name="" id="" placeholder="searchbar" />
                </div>
                {(userRole === null || userRole.type !== 'employee') && <div className="productLinks">
                    <Link to="/products">PRODUCTS</Link>
                    <Link to="/contact">CONTACT US</Link>
                    <Link to={isLoggedIn ? "/cart" : "/login"}><img  className="icon" src={process.env.PUBLIC_URL + '/icons/cart.png'} alt="cart-icon" /></Link>

                </div>}
                <div className="loginLinks">
                    <Link to ={isLoggedIn ? "/profile" : "/login"}><img  className="icon" src={process.env.PUBLIC_URL + '/icons/user.png'} alt="profileIcon" /></Link>
                    {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
                    <h3>{isLoggedIn && <p>You are logged in</p>}</h3> 
                </div>
                <div className="adminLinks">
                    {userRole !==null && userRole.type == 'employee' && <Link to="/employee">Management tool</Link>}
                </div>

            </nav>
        </div>
    )
}