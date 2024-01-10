import "../styles/products.css";
import React, { useEffect, useState } from 'react';

const findMinMaxPrice = (data) => {
    var maxValue = Math.max(...data.map(obj => obj.price))
    var minValue = Math.min(...data.map(obj => obj.price))

    return [minValue,maxValue]
}
const Filter = ({ products, onFilterChange }) => {

  const [sortBy, setSortBy] = useState('default');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(findMinMaxPrice(products));

  const uniqueCategories = Array.from(new Set(products.map((product)=> product.category)));

  const applyFilters = (filters) => {
    const appliedFilters = {
      sortBy: sortBy,
      rating: selectedRating,
      category: selectedCategory,
      price: priceRange,
      ...filters,
    };
    onFilterChange(appliedFilters);
  };

  useEffect(() =>{
    console.log("aha");
    applyFilters()

  },[sortBy,selectedRating,selectedCategory,priceRange]);


  return (
    <div>
      <h2>Product Filters</h2>
      <div>
        <label>
          Sort By:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="name">By name</option>
            <option value="price-asc">Price increasing</option>
            <option value="price-des">Price descending</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Ratings:
          {[1, 2, 3, 4, 5].map((rating) => (
            <label key={rating}>
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) => setSelectedRating(parseInt(e.target.value))}
              />
              {rating} stars
            </label>
          ))}
        </label>
      </div>
      <div>
        <label>
          Category:
          <select value={selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            {uniqueCategories.map((category,id)=>(
                <option key ={id} value={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
      </div>
    </div>
  );
};

export default Filter;
