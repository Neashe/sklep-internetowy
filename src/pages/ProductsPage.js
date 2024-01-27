import { useState } from "react";
import Filter from "../components/Filter";
import ProductsList from "../components/ProductsList";
import useFetch from "../hooks/useFetch";
import {api} from "../api/api";

const ProductsBrowser = () => {
    const [filteredProducts,setFilteredProducts] = useState([]);
    const {data: products, isPending, error} = useFetch(api,`products`);

    const onFilterChange = (filtered) =>{
        setFilteredProducts(filtered);
    }
    return ( 
        <div className="products-browser">
            {error && <span className="not-fetched"><h1>Sorry, could not fetch the data</h1></span>}
            {isPending && <p>Loading...</p>}
            {products && (<Filter products={products} onFilterChange={onFilterChange}></Filter>)}
            {filteredProducts && <ProductsList products={filteredProducts}></ProductsList>}
        </div>
     );
    }
 
export default ProductsBrowser;