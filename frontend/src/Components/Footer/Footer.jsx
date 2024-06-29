import React, { useEffect ,useState } from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';

const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    useEffect(() => {
        // Update the current year every minute to handle the case where the year changes while the user is on the page
        const intervalId = setInterval(() => {
          setCurrentYear(new Date().getFullYear());
        }, 60000);
    
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);


  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>            
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-7029779167</li>
                    <li>contact@testytrack.com</li>
                </ul>
            </div>
            
        </div>
        <hr/>
        <p className="footer-copyright">Copyright &copy; {currentYear}. All rights reserved | Sudipa Biswas. </p>
    </div>
  )
}

export default Footer