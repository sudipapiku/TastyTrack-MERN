import React, { useEffect ,useState } from 'react'
import './Footer.css'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

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
                <img className='logo' src={assets.logo} alt="" />
                <p>Your go-to app for quick and easy food delivery from top local restaurants. Browse, order, and track your meal effortlessly. Enjoy diverse cuisines and fast, secure service, right to your door.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>            
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li> <Link to='/'>Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-9876543210</li>
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