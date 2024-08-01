import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Components/online.css'


    const RazorpayPage = () => {
        const location = useLocation();
        const grandTotal = JSON.parse(localStorage.getItem('grandTotal'));
        const [amount, setAmount] = useState(grandTotal);
        const navigate = useNavigate();
      

        useEffect(() => {
            const loadScript = () => {
              const script = document.createElement('script');
              script.src = 'https://checkout.razorpay.com/v1/checkout.js';
              document.body.appendChild(script);
            };
        
            loadScript();
          }, []);

  const displayRazorpay = () => {
    const options = {
      key: 'rzp_test_seUlndGbBSddxm',
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Foodzilla',
      description: 'Payment for your order',
      handler: function (response) {
        // Verify the payment signature
        const signature = response.razorpay_signature;
        const orderId = response.razorpay_order_id;
        const paymentId = response.razorpay_payment_id;
  
        // Verify the signature with your secret key
        const secretKey = 'ztEUenYAqb0HHvPkrbQP1Hqe';
        const generatedSignature = crypto.createHmac('sha256', secretKey)
         .update(`${orderId}|${paymentId}`)
         .digest('hex');
  
        if (generatedSignature === signature) {
          // Payment is successful, update the order status
          axios.post('/api/orders/update', {
            orderId,
            paymentId,
            status: 'paid',
          })
           .then((response) => {
              console.log('Order updated successfully');
              // Redirect to success page
              navigate('/success', { state: { orderId, paymentId } });
            })
           .catch((error) => {
              console.error('Error updating order:', error);
            });
        } else {
          console.error('Payment signature verification failed');
          // Handle payment failure
        }
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className='online-button'>
      <p className='proceed-text'>Proceed to pay online:</p>
      <button className="App-link" onClick={displayRazorpay}>
        Pay ₹{amount}
      </button>
    </div>
  );
};

export default RazorpayPage;