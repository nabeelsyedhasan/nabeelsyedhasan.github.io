import { useLocation } from 'react-router-dom';
import '../Components/success.css'


function Success() {
    const location = useLocation();
    const order = location.state.order;
    const cartItems = location.state.cartItems;
    const address = location.state.address;
    const grandTotal = localStorage.getItem('grandTotal');
  
    return (
      <div className="container">
        <div className="checkmark checked"></div>
      <h1>Order Placed Successfully</h1>
      <div className="order-details">
        <p>Order Details:</p>
        <p>
          Address: <span>{address}</span>
        </p>
        <p>
          Payment Option: <span>{order.paymentOption}</span>
        </p>
      </div>
      <ul>
        {cartItems.map((item, index) => (
          <li className="list" key={index}>
            <span>{item.name}</span> ({item.size}) - Quantity: {item.quantity} - Total: ₹{item.totalPrice}
          </li>
        ))}
      </ul>
      <div className="grand-total">
        Grand Total: <span>₹{grandTotal}</span>
      </div>
    </div>
    );
}

export default Success;