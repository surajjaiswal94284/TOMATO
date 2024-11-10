import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [activeLink, setActiveLink] = useState('/');
    const { token, setToken } = useContext(StoreContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link 
                    className={`navbar-brand ${activeLink === '/' ? 'active-link' : ''}`} 
                    to='/'
                    onClick={() => setActiveLink('/')}
                >
                    <img 
                        src={assets.logo} 
                        alt="Website Logo" 
                        className="d-inline-block align-text-top webLogo" 
                    />
                </Link>

                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeLink === '/' ? 'active-link' : ''}`} 
                                href="/" 
                                onClick={() => setActiveLink('/')}
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className={`nav-link ${activeLink === '/#explore-menu' ? 'active-link' : ''}`} 
                                href="/#explore-menu" 
                                onClick={() => setActiveLink('/#explore-menu')}
                            >
                                Menu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${activeLink === '/#app-download' ? 'active-link' : ''}`} 
                                href="/#app-download" 
                                onClick={() => setActiveLink('/#app-download')}
                            >
                                Mobile App
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className={`nav-link ${activeLink === '/#footer' ? 'active-link' : ''}`} 
                                href="/#footer" 
                                onClick={() => setActiveLink('/#footer')}
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="d-flex align-items-center">
                    <img src={assets.search_icon} alt="Search Icon" className="mx-4" />
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt="Shopping Basket Icon" className="basket-icon mx-3" />
                    </Link>

                    {!token ? (
                        <button className="btn btn-signup mx-2" onClick={() => setShowLogin(true)}>Sign Up</button>
                    ) : (
                        <div 
                            className='navbar-profile' 
                            onMouseEnter={() => setShowDropdown(true)} 
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <img src={assets.profile_icon} alt='profile-icon' className='mx-3'/>
                            {showDropdown && (
                                <ul className='nav-profile-dropdown'>
                                    <li onClick={()=>navigate('/myorders')}>
                                        <img src={assets.bag_icon} alt='bag-icon'/>
                                        <p>Orders</p>
                                    </li>
                                    <hr />
                                    <li onClick={handleLogout}>
                                        <img src={assets.logout_icon} alt='logout' />
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
