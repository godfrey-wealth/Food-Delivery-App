import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

        <div className="footer-content">
            <div className="footer-content-left">

                <img src={assets.logo} alt="" />

                <p>Easily create daily, weekly or monthly budgets and empower your employees to eat what, when and where they want.
                You set the price limit. They pick their favourites. Everybody wins </p>
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
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>Call us: 0123456789</li>
                    <li>Email: contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All rights reserved</p>
    </div>
  )
}

export default Footer