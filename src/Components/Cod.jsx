import { useState } from 'react';
import axios from 'axios';

function Cod() {
  const [order, setOrder] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/orders', order)
      .then(response => {
        console.log(response.data);
        // display success message to user
      })
      .catch(error => {
        console.error(error);
        // display error message to user
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Cash on Delivery</h1>
          <form onSubmit={handleSubmit}>
            {/* add your form fields here */}
            <button type="submit" className="btn btn-primary">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cod;