import Filter from "../components/Filter";
import ProductsList from "../components/ProductsList";
const ProductsBrowser = () => {

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
    var filteredProducts = products;

    const onFilterChange = (filters) =>{
        filteredProducts = products
        .filter((product) => {
            if (filters.rating !== 0){
                return filters.rating === product.rating;
            }
            console.log(filters.category);
            if (filters.category !== "all"){
                return filters.category === product.category;
            }

        })
        .sort((a,b)=>{
            const titleA = a.productName.toLowerCase();
            const titleB = b.productName.toLowerCase();
            if (filters.sortBy === 'name'){
                return titleA.localeCompare(titleB);    
            }
            return 0;
        })

        console.log(products);
    }
    return ( 
        <div className="products-browser">
            <Filter products={products} onFilterChange={onFilterChange}></Filter>
            <ProductsList products={filteredProducts}></ProductsList>
        </div>
     );
}
 
export default ProductsBrowser;