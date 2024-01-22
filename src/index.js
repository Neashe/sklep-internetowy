import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/HomePage"
import Register from "./pages/RegisterPage"
import Login from "./pages/LoginPage"
import Profile from "./pages/ProfilePage"
import Employee from "./pages/AdminPage"
import Navbar from "./components/Navbar"
import { AuthProvider } from "./hooks/useAuth";
import ProductsBrowser from "./pages/ProductsPage";
import Product from "./pages/ProductPage";
import Contact from "./pages/ContactPage";
import AddProduct from "./pages/AddProduct";
import ModifyProducts from "./pages/ModifyProducts";
import ModifyProduct from "./pages/ModifyProduct";
import { CartProvider } from "./hooks/useCart";
import Cart from "./pages/CartPage"

function App(){

    return(
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/employee" element={<Employee />} />
                        <Route path="/products" element={<ProductsBrowser />} />
                        <Route path="/products/:id" element={<Product />} />
                        <Route path="/contact" element={<Contact />}></Route>
                        <Route path="/employee/addProduct" element={<AddProduct />} />
                        <Route path="/employee/modifyProducts" element={<ModifyProducts />} />
                        <Route path="/employee/modifyProducts/:id" element={<ModifyProduct />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App />)