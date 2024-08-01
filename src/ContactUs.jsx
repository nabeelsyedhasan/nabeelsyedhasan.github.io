import { FaWhatsapp }from "react-icons/fa";
import { MdEmail } from "react-icons/md"

function ContactUs() {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">Contact Us</h1>
      <p className="lead text-black-50">Get in touch with us!</p>
      <div className="row">
        <div className="col-md-6">
          <p className="text-black-50">Have a question or feedback? :</p>
          <p className="fab fa-whatsapp text-success" > Send us a message on WhatsApp</p>
          <div className="linkd">
          <a href="https://wa.me/917453999988" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={35} />
          </a>
          </div>
          
        </div>
        <div className="col-md-6">
          <p className="text-black-50">Or, you can email us at:</p>
          <p> nabeelsyedhasan@gmail.com</p>
          <div className="git">
          <a href="mailto:nabeelsyedhasan@gmail.com" target="_blank" rel="noopener noreferrer">
            <MdEmail size={35}/>
          </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ContactUs;