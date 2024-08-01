import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './Components/AboutUs.css'; 

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-us-heading">About Us</h2>
      <p>Welcome to Foodzilla, your one-stop destination for all things food! We are a passionate team of developers, designers, and food enthusiasts dedicated to bringing you the best culinary experiences.</p>
      <p>Our mission is to make finding and enjoying great food as easy as pie. With Foodzilla, you can discover new restaurants, read honest reviews, and order delicious meals with just a few clicks.</p>
      <p>Whether you are craving pizza, sushi, or something in between, Foodzilla has you covered. Join us on our journey to revolutionize the way you experience food!</p>
      <div className="linkd">
        <a href="https://www.linkedin.com/in/nabeel-syed-hasan-5b4220221" target="_blank" rel="noopener noreferrer" >
          <FaLinkedin size={24} />
          </a>
          </div>
        <div className="git">    
          <a href="https://github.com/nabeelsyedhasan" target="_blank" rel="noopener noreferrer" >  
          <FaGithub />
        </a>
      </div>
    </div>
  );
}

export default AboutUs;