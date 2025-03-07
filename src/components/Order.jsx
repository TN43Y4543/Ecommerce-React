import React from "react";
import "../components/Order.css";
import Button from "react-bootstrap/Button";
import img from "../assets/free.avif"
import { useNavigate } from "react-router-dom";
import delivery from "../assets/delivery.jpg"

const Order = () => {

   let navigate= useNavigate()
   let address = JSON.parse(localStorage.getItem("deliveryAddress")) || {};
  return (
    <div className="order-page"       style={{
        backgroundImage: `url(${delivery})`, // Correct way to set background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="order-container">
        <header>
          <h1 className="order-title">🎉 Thank You for Your Purchase {address.name}!</h1>
        </header>

        <p className="order-text">
          Your order has been successfully placed. You will receive an email confirmation shortly.
        </p>
        <p className="order-text">Thank you for shopping at Elegance! 🛍️</p>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <p><strong>Order Number:</strong> #123456</p>
          <p><strong>Delivery Address:</strong> {address.name}, {address.mobile}, {address.address}, {address.district}</p>
          <p><strong>Estimated Delivery:</strong> Within 4 days 🚚</p>
        </div>

        <div className="order-buttons">
          <Button variant="secondary" className="btn-custom" onClick={()=>navigate("/")}>🏠 Back To Home</Button>
          <Button variant="dark" className="btn-custom" onClick={()=>navigate("/feedback")}>📝 Feedback</Button>
        </div>
      </div>
    </div>
  );
};

export default Order;
