import React from 'react';
import {Link} from 'react-router-dom';

import './footer.css';

import footerLogo from '../resources/basic/images/footer-logo.png';

import facebook from '../resources/basic/images/socials/facebook.png';
import twitter from '../resources/basic/images/socials/twitter.png';
import youtube from '../resources/basic/images/socials/youtube.png';
import linkedin from '../resources/basic/images/socials/linkedin.png';
import instagram from '../resources/basic/images/socials/instagram.png';

const Footer = (props) => {
    return (
        <footer>
            <div className="container">
                <div className="footer-logo-wrapper">
                    <img className="footer-logo" src={footerLogo} alt="StatRoute logo" title="StatRoute"/>
                </div>
                <p>
                    <Link to="/pages/terms-and-conditions">Terms & Conditions</Link>
                    {/*<a href="#vision">Mission / Vision</a>
                     <a href="#contact">Contact Us</a>
                     <a href="#careers">Careers</a>*/}
                </p>
                <div className="footer-socials">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/StatRouteInc/"><img
                        src={facebook} alt="Facebook" title=""/></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/Stat_Route"><img
                        src={twitter} alt="Twitter" title=""/></a>
                    <a target="_blank" rel="noopener noreferrer"
                       href="https://www.youtube.com/channel/UCQ5NhuUHWygyBOz6QTgcIiA"><img src={youtube} alt="Youtube"
                                                                                            title=""/></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/24601099/"><img
                        src={linkedin} alt="LinkedIn" title=""/></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/statroute/"><img
                        src={instagram} alt="Instagram" title=""/></a>
                </div>
            </div>
        </footer>
    );
};


export default Footer;