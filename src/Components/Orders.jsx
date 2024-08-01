import { useLocation } from 'react-router-dom';

function Orders() {
  const location = useLocation();
  const order = location.state.order;
  const cartItems = location.state.cartItems;
  const address = location.state.address;
  const grandTotal = location.state.grandTotal;

  return (
    <div className="container">
      <h1>Your Orders</h1>
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

export default Orders;