import { useState } from "react";
import Filter from "../components/Filter";
import ProductsList from "../components/ProductsList";
const ProductsBrowser = () => {

    const defaultFilters ={
        sortBy: 'default',
        rating: 0,
        category: 'all',
        price: [0,9999],
    }

    const[Filters,setFilters] = useState(defaultFilters);

    const products = [
        {
            "productID": 1,
            "productName": "Laptop",
            "category": "Electronics",
            "price": 999.99,
            "quantity": 50,
            "rating": 4.5,
            "description": "Powerful laptop for all your computing needs",
            "thumbnail": ""
        },
        {
            "productID": 2,
            "productName": "Smartphone",
            "category": "Electronics",
            "price": 499.99,
            "quantity": 100,
            "rating": 4.2,
            "description": "Feature-rich smartphone with the latest technology",
            "thumbnail": ""
        },
        {
            "productID": 3,
            "productName": "Coffee Maker",
            "category": "Appliances",
            "price": 79.99,
            "quantity": 30,
            "rating": 4.0,
            "description": "Brew your favorite coffee with this stylish coffee maker",
            "thumbnail": ""
        },
        {
            "productID": 4,
            "productName": "Running Shoes",
            "category": "Sports & Outdoors",
            "price": 89.99,
            "quantity": 75,
            "rating": 4.8,
            "description": "Comfortable and durable running shoes for your active lifestyle",
            "thumbnail": ""
        }
    ]
    const filteredProducts = products
    .filter((product) => {
        
        const ratingCondition = Filters.rating !== null ? Filters.rating === Math.floor(product.rating): true;
        const categoryCondition = Filters.category !== 'all' ? Filters.category === product.category : true;

        return ratingCondition && categoryCondition;
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

    const onFilterChange = (filters) =>{
        setFilters(filters);
    }
    return ( 
        <div className="products-browser">
            <Filter products={products} onFilterChange={onFilterChange}></Filter>
            <ProductsList products={filteredProducts}></ProductsList>
        </div>
     );
    }
 
export default ProductsBrowser;