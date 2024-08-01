import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import foodCategories from '../Data/foodCategory.json';
import './FoodCard.css'; 
import AddButton from './AddButton'; 
import foodData from '../Data/foodData2.json'; 
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


const FoodCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const  handleAddToCart = (foodItem, selectedOption) => {
    // Add the selected item to cartItems state
    const newItem = { name: foodItem.name, size: selectedOption, price: parseInt(selectedOption) };
    setCartItems(prevItems => [...prevItems, newItem]);
  };
  
  //carousel settings
  
  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <AiOutlineArrowLeft className="arrows" style={{ color: 'green' }} />
    </div>
  );
  
  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <AiOutlineArrowRight className="arrows" style={{ color: 'green' }} />
    </div>
  );
  NextArrow.propTypes = {
    onClick: PropTypes.func,
  };
  PrevArrow.propTypes = {
    onClick: PropTypes.func,
  };
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: false,
    arrows: true,
    prevArrow: <PrevArrow  />,
    nextArrow: <NextArrow  />, 
  }

  return (
    <div>
      {foodCategories.map((category) => (
        <div className="slider-wrapper" style={{ position: 'relative' }} key={category.CategoryName}>
          <h2>{category.CategoryName}</h2>
          <Slider {...settings} >
            {foodData
              .filter((item) => item.CategoryName === category.CategoryName)
              .map((foodItem) => (
                <div key={foodItem.name} className="card" >
                  <div className="card-content">
                    <div className="card-img">
                      <img src={foodItem.img} alt={foodItem.name} />  
                    </div>
                    <div className="card-details">
                      <h3>{foodItem.name}</h3>
                      <p>{foodItem.description}</p>
                      <AddButton foodItem={foodItem}  handleAddToCart={ handleAddToCart} />
                     
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      ))}
     
    </div>
  );
};

FoodCard.propTypes = {
   handleAddToCart: PropTypes.func.isRequired
};

export default FoodCard;

