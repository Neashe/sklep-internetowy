import "../styles/products.css";
import React, { useState } from 'react';

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

  const applyFilters = (filters) => {
    const appliedFilters = {
      sortBy,
      rating: selectedRating,
      category: selectedCategory,
      price: priceRange,
      ...filters,
    };
    onFilterChange(appliedFilters);
  };

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
            {products.map((product)=>(
                <option value={product.category}>{product.category}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
      </div>
      <button onClick={applyFilters}>Apply filters</button>
    </div>
  );
};

export default Filter;
