import React from "react";
import aboutImage from "../assets/about.jpg";
import about2Image from "../assets/about2.jpg";
 // Adjust path as needed

const About = () => {
  return (
    <section className="section__container about__container" id="about">
      <div className="about__header">
        <div>
          <h2 className="section__header">About us</h2>
          <p className="section__description">
          Our passion for exquisite craftsmanship drives us to curate the finest dresses for every occasion.
          </p>
        </div>
        <button className="about__btn">Learn More</button>
      </div>
      <div className="about__content">
        <div className="about__image">
          <img src={aboutImage} alt="about" />
          <img src={about2Image} alt="about2" />
        </div>
        <div className="about__grid">
          <div className="about__card">
            <h3>1.</h3>
            <h4>Who we are</h4>
            <p>
            We are a fashion-forward dress boutique, curating elegant and timeless styles for every occasion.
            </p>
          </div>
          <div className="about__card">
            <h3>2.</h3>
            <h4>What do we do</h4>
            <p>
            We design and curate stylish, high-quality dresses that celebrate elegance, confidence, and individuality.
            </p>
          </div>
          <div className="about__card">
            <h3>3.</h3>
            <h4>How do we help</h4>
            <p>We help you find the perfect dress that complements your style, boosts your confidence, and makes every occasion special.</p>
          </div>
          <div className="about__card">
            <h3>4.</h3>
            <h4>Create success story</h4>
            <p>
            From a small boutique to a fashion destination, we empower confidence and elegance—one dress at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
