import "../styles/filter.css";
import React, { useEffect, useState } from 'react';
import ReactSlider from "react-slider";

const findMinMaxPrice = (data) => {
    var maxValue = Math.max(...data.map(obj => obj.price))
    var minValue = Math.min(...data.map(obj => obj.price))

    return [minValue,maxValue]
}
const Filter = ({ products, onFilterChange }) => {

  const [loading,setLoading] = useState(true);
  const [defaultPriceRange,setDefaultPriceRange] = useState([0,9999]);
  const [priceRange, setPriceRange] = useState([0,9999]);
  const [sortBy, setSortBy] = useState('default');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const uniqueCategories = Array.from(new Set(products.map((product)=> product.category)));

  const filterProducts = (products) => {
    const filtered = products.filter((product) => {

        const ratingCondition = selectedRating !== null ? selectedRating === Math.floor(product.rating): true;
        const categoryCondition = selectedCategory !== 'all' ? selectedCategory === product.category : true;
        const priceCondition = priceRange[0] <= product.price && product.price <= priceRange[1];

        return ratingCondition && categoryCondition && priceCondition;
    })
    .sort((a,b)=>{
        const titleA = a.productName.toLowerCase();
        const titleB = b.productName.toLowerCase();
        if (sortBy === 'name'){
            return titleA.localeCompare(titleB);    
        }
        if (sortBy === 'price-asc'){
            return a.price - b.price;
        }
        if (sortBy === 'price-desc'){
            return b.price - a.price;
        }
        return 0;
    })
    onFilterChange(filtered);
}

  const handlePriceRange = () =>{
    filterProducts(products);
  }

  useEffect(() => {
    const fetchDefaultPriceRange = async () => {
      const range = findMinMaxPrice(products);
      setDefaultPriceRange(range);
      setPriceRange(range);
      setLoading(false);
    };
    if (products){
      fetchDefaultPriceRange();
    }
    
  }, [products]);

  useEffect(() =>{
    filterProducts(products);

  },[sortBy,selectedRating,selectedCategory]);


  return (
    <div className="filter">
      <div className="filter-comp">
        <label htmlFor="sort">
          Sort By
        </label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="name">By name</option>
            <option value="price-asc">Price increasing</option>
            <option value="price-des">Price descending</option>
          </select>
      </div>

      <div className="filter-comp">
        <label className="filter-label">
          Ratings
          {[1, 2, 3, 4, 5].map((rating) => (
            <label className="ratings"            
            key={rating}>
            <br />
              <input
                className="ratings"
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                readOnly
                onClick={(e) => {
                  const newRating = parseInt(e.target.value);
                  setSelectedRating((prevRating) => (prevRating === newRating ? null : newRating));
                }}
              />
              {rating} stars
            </label>
          ))}
        </label>
      </div>

      <div className="filter-comp">
        <label htmlFor="category" className="filter-label">Category</label>
        <select id="category" value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            {uniqueCategories.map((category,id)=>(
                <option key ={id} value={category}>{category}</option>
            ))}
          </select>
      </div>
      {products.length>0 && <div className="filter-comp">
        <label className="filter-label">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>  
        {!loading && <ReactSlider
          className="horizontal-slider"
          thumbClassName="example-thumb"
          trackClassName="example-track"
          range={defaultPriceRange}
          value={priceRange}
          min={defaultPriceRange[0]}
          max={defaultPriceRange[1]}
          onChange={(value) =>setPriceRange(value)}
          pearling
          minDistance={50}
        />}
    {!loading && <button className="btn btn-red btn-md" onClick={handlePriceRange}>Apply</button>}
    {console.log(products)}
    </div>}
    </div>
  );
};

export default Filter;
