import Carousel from 'react-bootstrap/Carousel';
import '../index.css';

function CarouselComponent() {
  return (
<Carousel fade className="carousel-full-width" interval={2000}>
      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src="launch.png"
          alt="Food Coupon"
        />
        <Carousel.Caption>
          <h3>Grab discount now!!!</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src="https://images.unsplash.com/photo-1631515242808-497c3fbd3972?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Order the best Biryanis</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-75 mx-auto"
          src="https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Must try pizzas</h3>
        </Carousel.Caption>
      </Carousel.Item>

      
    </Carousel>
  );
}

export default CarouselComponent;