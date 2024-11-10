import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="container header d-flex align-items-center justify-content-center mt-4">
      <div className=" text-center header-overlay">
        <h2 className="display-4 text-white fw-bold">
          Order your favourite food here
        </h2>
        <p className="text-white fs-5">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        
        <a href="/#explore-menu">
            <button className="btn btn-light fw-semibold px-4 py-2">
                View Menu
            </button>
        </a>
      </div>
    </div>
  );
};

export default Header;
