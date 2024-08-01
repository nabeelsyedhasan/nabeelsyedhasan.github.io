import CarouselComponent from './Components/CarouselComponent';
import FoodCard from './Components/FoodCard'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function Home() {
  const username = localStorage.getItem('username');
  // handleAddToCart function
  const  handleAddToCart = (foodItem, selectedOption) => {
  console.log('Add to cart:', foodItem, selectedOption);
  };
  return (
    
    <div>
      <div className="bg-video"></div>
     {username ? <h1>Welcome, {username}!</h1> : <h1>Welcome!</h1>}
      <h5>Get delicious food at your doorstep!</h5>
      <div className="container">
        <CarouselComponent />
{/* <div className="bg-video"></div> */}
      </div>

      <h2>Dishes</h2>
      <div className="container">
        <FoodCard  handleAddToCart={ handleAddToCart} /> 
      </div>
    </div>

  );
}

export default Home;