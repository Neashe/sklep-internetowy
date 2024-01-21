import { useState, useEffect } from "react";
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