import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from './CartBtn.module.css';

const CartBtn = ({ item, updateGrandTotal, index }) => {
  const getItemPrice = (item, size) => {
    if (item.CategoryName === 'Pizza') {
      switch (size) {
        case 'Regular':
          return parseFloat(item.options[0].regular);
        case 'Medium':
          return parseFloat(item.options[0].medium);
        case 'Large':
          return parseFloat(item.options[0].large);
        default:
          return 0;
      }
    } else {
      // For biryani/rice and starters, check if the size is 'half' or 'full'
      const option = item.options[0];
      return parseFloat(size === 'half' ? option.half : option.full);
    }
  };

  const initialQuantity = localStorage.getItem(`quantity_${item.name}`) || 1;
  const initialSize = localStorage.getItem(`size_${item.name}`) || 'Regular';

  const [quantity, setQuantity] = useState(parseInt(initialQuantity));
  const [size, setSize] = useState(initialSize);
  const [totalPrice, setTotalPrice] = useState(getItemPrice(item, initialSize));

  useEffect(() => {
    // Update cartItems in localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const updatedItems = cartItems.map((cartItem, i) => {
      if (i === index) {
        return {...cartItem, quantity, totalPrice, size };
      }
      return cartItem;
    });
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    updateGrandTotal();
    localStorage.setItem(`quantity_${item.name}`, quantity);
    localStorage.setItem(`size_${item.name}`, size);
  }, [quantity, totalPrice, item.name, updateGrandTotal, size, index]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    const price = getItemPrice(item, size);
    const newTotalPrice = price * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setSize(newSize);
    const price = getItemPrice(item, newSize);
    const newTotalPrice = price * quantity;
    setTotalPrice(newTotalPrice);
  };

  
  return (
    <div className={styles["btn-group1"]}>
      <img src={item.img} alt={item.name} className={styles["item-image"]} />
      <br/>
      <select value={quantity} onChange={handleQuantityChange}>
        Quantity:
        {[...Array(5).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      {item.CategoryName === 'Pizza' ? (
        <select value={size} onChange={handleSizeChange}>
          Size:
          <option value="Regular">Regular</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      ) : (
        <select value={size} onChange={handleSizeChange}>
          Size:
          <option value="half">Half</option>
          <option value="full">Full</option>
        </select>
      )}
      <p className={styles["para1"]}>Total: ₹{totalPrice}</p>
    </div>
  );
};

CartBtn.propTypes = {
  item: PropTypes.object.isRequired,
  updateGrandTotal: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default CartBtn;