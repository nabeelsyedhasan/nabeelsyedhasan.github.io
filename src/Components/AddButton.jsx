import { useState } from 'react';
import PropTypes from 'prop-types';

const AddButton = ({ foodItem }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Save selected option to localStorage
    const cartItem = { ...foodItem, selectedOption }; 
    const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedItems = [...existingItems, cartItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    alert('Added to cart');
  };

  const renderDropdown = () => {
    if (foodItem.CategoryName === "Biryani/Rice" || foodItem.CategoryName === "Starter") {
      return (
        <select className="form-control1" onChange={(e) => handleOptionSelect(e.target.value)}>
          <option value="">Select Size</option>
          {foodItem.options.map((option, index) => (
            <optgroup key={index} >
              <option value={option.half}>Half: {option.half}</option>
              <option value={option.full}>Full: {option.full}</option>
            </optgroup>
          ))}
        </select>
      );
    } else if (foodItem.CategoryName === "Pizza") {
      return (
        <select className="form-control1" onChange={(e) => handleOptionSelect(e.target.value)}>
          <option value="">Select Size</option>
          {foodItem.options.map((option, index) => (
            <optgroup key={index} label={option.size}>
              {Object.entries(option).map(([size, price]) => (
                <option key={size} value={price}>
                  {size}: {price}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      );
    } else {
      return null;
    }
  };

  return renderDropdown();
};

AddButton.propTypes = {
  foodItem: PropTypes.shape({
    CategoryName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        half: PropTypes.string,
        full: PropTypes.string,
        regular: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string
      }).isRequired
    ).isRequired
  }).isRequired
};

export default AddButton;