import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import ProductsList from "../components/ProductsList";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      'Content-Type': 'application/json',
    },
  });
const ProductsBrowser = () => {

    const defaultFilters ={
        sortBy: 'default',
        rating: 0,
        category: 'all',
        price: [0,9999],
    }

    const[Filters,setFilters] = useState(defaultFilters);
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
        // filterProducts(products);
    },[])

    useEffect(() => {
        if (!loading){
            filterProducts(products);
        }
      }, [Filters, products]);

    const filterProducts = (products) => {
        const filtered = products.filter((product) => {

            const ratingCondition = Filters.rating !== null ? Filters.rating === Math.floor(product.rating): true;
            const categoryCondition = Filters.category !== 'all' ? Filters.category === product.category : true;
            const priceCondition = Filters.price[0] <= product.price && product.price <= Filters.price[1];
    
            return ratingCondition && categoryCondition && priceCondition;
        })
        .sort((a,b)=>{
            const titleA = a.productName.toLowerCase();
            const titleB = b.productName.toLowerCase();
            if (Filters.sortBy === 'name'){
                return titleA.localeCompare(titleB);    
            }
            if (Filters.sortBy === 'price-asc'){
                return a.price - b.price;
            }
            if (Filters.sortBy === 'price-desc'){
                return b.price - a.price;
            }
            return 0;
        })
        setFilteredProducts(filtered);
    }

    const onFilterChange = (filters) =>{
        setFilters(filters);
        // filterProducts(products);
    }
    return ( 
        <div className="products-browser">
            <h1>{loading}</h1>
            {console.log(loading)}
            {products && (<Filter products={products} onFilterChange={onFilterChange}></Filter>)}
            {filteredProducts && <ProductsList products={filteredProducts}></ProductsList>}
        </div>
     );
    }
 
export default ProductsBrowser;