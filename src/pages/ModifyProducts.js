import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Filter from "../components/Filter";
import ProductsList from "../components/ProductsListModify";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
const ProductsBrowser = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
          navigate("/login");
          return;
      }
      fetch("http://localhost:5000/protected/employee", {
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
          console.log(data)
      })
      .catch(errorPromise =>{
          console.log(errorPromise)
          errorPromise.then(error => {
              if(error.msg == "Token has expired"){
                  localStorage.removeItem("jwtToken")
                  navigate("/")
              }
              if(error.msg == "You do not have permission to access this page."){
                  alert(error.msg)
                  navigate("/")
              }
          })
      })
  }, [])

    useEffect(()=>{
        const fetchProducts = async () => {
            try {
              const response = await api.get('products');
              setProducts(response.data);
              setLoading(false);
            } catch (error) {
              console.error("Error fetching products:", error);
            }
          };

        fetchProducts(); 
        setFilteredProducts(products);
    },[])

    useEffect(() => {
        if (!loading){
            setFilteredProducts(products);
        }
      }, [products]);

    const onFilterChange = (filtered) =>{
        setFilteredProducts(filtered);
    }

    const reloadPage = () => {
        window.location.reload();
    }

    return ( 
        <div className="products-browser">
            <h1>{loading}</h1>
            {console.log(loading)}
            {products && (<Filter products={products} onFilterChange={onFilterChange}></Filter>)}
            {filteredProducts && <ProductsList products={filteredProducts} reloadPage={reloadPage}></ProductsList>}
            {console.log(filteredProducts)}
        </div>
     );
    }
 
export default ProductsBrowser;