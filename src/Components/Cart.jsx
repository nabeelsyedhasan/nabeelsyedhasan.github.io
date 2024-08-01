import CartBtn from './CartBtn';
import { useState, useEffect } from 'react';
import '../index.css'

const Cart = () => {
  // Get cart items from localStorage
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [grandTotal, setGrandTotal] = useState(0); 

  useEffect(() => {
    let newTotal = 0;
    cartItems.forEach((item) => {
      newTotal += parseFloat(item.totalPrice);
    });
    setGrandTotal(newTotal);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('grandTotal', grandTotal);
  }, [grandTotal]);

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    setGrandTotal(prevGrandTotal => prevGrandTotal - parseFloat(cartItems[index].totalPrice));
  };

  return (
    <div className="cart">
      <div className="cart-video"></div>
      <h2>Cart</h2>
      {cartItems.length > 0? (
        cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="translucent-box">
            <h3>{item.name}</h3>
            <CartBtn item={item} updateGrandTotal={setGrandTotal} index={index} />
            <button onClick={() => removeFromCart(index)} className="btn btn-danger">Remove</button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
<div className="grand-total-checkout-container">
<div className="grand-total-box"> 
        <p>Grand Total: ₹{grandTotal}</p>
      

      <button className="checkout-btn" onClick={() => {
      const url = `/checkout?total=${grandTotal}&cartItems=${JSON.stringify(cartItems)}`;
      window.location.href = url;
      }}>Checkout
      </button>
      </div>
</div>
    </div>
  );
};

export default Cart;