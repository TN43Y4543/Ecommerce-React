import React from 'react'
import headerImage from "../assets/header.png";

const Head = () => {
  return (
    <div>
          <header className="section__container header__container" id="home">
      <div className="header__image">
        <img src={headerImage} alt="Modern Interior" />
      </div>
      <div className="header__content">
        <div>
        <h1>We Help You Elevate Your Style</h1>
        <p>
        Discover elegant and luxurious outfits designed by top fashion experts to enhance your wardrobe.
      </p>

        </div>
      </div>
    </header>
      
    </div>
  )
}

export default Head
