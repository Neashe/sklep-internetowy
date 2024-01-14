import "../styles/products.css";
import React, { useEffect, useState } from 'react';
import ReactSlider from "react-slider";


const findMinMaxPrice = (data) => {
    var maxValue = Math.max(...data.map(obj => obj.price))
    var minValue = Math.min(...data.map(obj => obj.price))

    return [minValue,maxValue]
}
const Filter = ({ products, onFilterChange }) => {

  console.log(products);
  const [loading,setLoading] = useState(true);
  const [defaultPriceRange,setDefaultPriceRange] = useState([0,9999]);
  const [priceRange, setPriceRange] = useState([0,9999]);

  const [sortBy, setSortBy] = useState('default');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    console.log("load!");
    
  }, [products]);

  useEffect(() =>{
    applyFilters()

  },[sortBy,selectedRating,selectedCategory,priceRange]);


  return (
    <div className="filter">
      <h2>{String(loading)}</h2>
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
      {!loading && <div>
        <label className="filter-label">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>  
        <ReactSlider
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
        />
    </div>}
    </div>
  );
};

export default Filter;
