import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import MapComponent from './Map';
import RazorpayPage from '../Components/RazorpayPage';
import '../index.css'

const Checkout = () => {
  const [address, setAddress] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const addressParam = params.get('address');
    const grandTotalParam = params.get('grandTotal'); // Retrieve grandTotal from URL
    if (addressParam) setAddress(addressParam);
    if (grandTotalParam) setGrandTotal(parseFloat(grandTotalParam)); // Set grandTotal state
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (paymentOption === 'cod') {
      axios.post('http://127.0.0.1:3001/api/orders', { address, paymentOption, cartItems, grandTotal })
        .then(response => {
          // Redirect to success page with order details
          navigate('/success', { state: { order: response.data.order, cartItems, address, grandTotal } });
        })
        .catch(error => {
          console.error('Error placing order:', error);
          // Handle error if needed
        });
    } else if (paymentOption === 'online') {
      navigate('/online', { state: { grandTotal } }); // Pass grandTotal to RazorpayPage
    }
  };

  const handleMapClick = (e) => {
    setSelectedLocation(e.latlng);
  };

  const handleClosePopup = () => {
    setSelectedLocation(null);
  };
  function getAddressFromCoordinates(lat, lng) {
    const apiKey = 'pk.eyJ1Ijoibm9ib2R5MDA0NyIsImEiOiJjbHZ3eGZ0bWQxcmJmMmlud2NpNDhqd3ZtIn0.qsJ4JcMMeu2TvIMsNGzu-w';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}&limit=1`;
  
    return axios.get(url).then((response) => {
      const address = response.data.features[0].place_name;
      return address;
    });
  }
  
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setSelectedLocation({ lat: latitude, lng: longitude });
          setAddress(`Latitude: ${latitude}, Longitude: ${longitude}`);
          getAddressFromCoordinates(latitude, longitude).then((address) => {
            setAddress(address);
          });
          
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Error getting location. Please check your browser settings and try again.');
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container">
       <div className="background-image"></div>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address:</label>
              <input type="text" id="address" value={address} onChange={handleAddressChange} className="form-control" />
            </div>

            <button type="button" onClick={getCurrentLocation} className="btn btn-primary mb-3">
              Get Current Location
            </button>

            <div className="mb-3">
              <label htmlFor="paymentOption" className="form-label">Payment Option:</label>
              <select id="paymentOption" value={paymentOption} onChange={handlePaymentOptionChange} className="form-select">
                <option value="">Select an option</option>
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            <button type="submit" disabled={!paymentOption} className="btn btn-success">
              {paymentOption === 'cod' ? 'Confirm and Pay with Cash on Delivery' : 'Confirm and Pay Online'}
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <div className="map-container">
          <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;