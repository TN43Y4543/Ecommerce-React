import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "../components/Transaction.css"; // Ensure CSS is added
import upi from "../assets/upi.jpeg"
import walletImage from "../assets/wallet.png"
import phonepe from "../assets/phonepe.jpg"
import card from "../assets/card.jpeg"
import { clearCart} from "../store/cartSlice"
import { GoShieldCheck } from "react-icons/go";
import {useDispatch} from 'react-redux'


const Transaction = () => {
  const { price,quantity,orderType } = useParams(); // Get price from URL
  console.log(quantity)
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [upiApp, setUpiApp] = useState(""); // Selected UPI app
  const [wallet, setWallet] = useState(""); // Selected Wallet
  const [bank, setBank] = useState(""); // Selected Bank
  const [cardNumber, setCardNumber] = useState(""); // Credit Card Number
  const [orderedType,setOrderedType]=useState("direct")

  let tax=parseFloat(price*0.10).toFixed(0);
  let deliveryCharge=parseFloat(price*0.04).toFixed(0);
  let amountPayable=parseFloat(price) + parseFloat(tax) + 3
  let dispatch=useDispatch()
  let address = JSON.parse(localStorage.getItem("deliveryAddress")) || {};

  

  const handlePayment = () => {
    console.log(address)
    setOrderedType(orderType)
    if (!paymentMethod) {
      Swal.fire({
        title: "Error",
        text: "Please select a payment method",
        icon: "error",
      });
      return;
    }
  
    let selectedPayment = "";
  
    switch (paymentMethod) {
      case "upi":
        if (!upiApp) {
          Swal.fire({
            title: "Error",
            text: "Please select a UPI app",
            icon: "error",
          });
          return;
        }
        selectedPayment = upiApp;
        break;
  
      case "wallet":
        if (!wallet) {
          Swal.fire({
            title: "Error",
            text: "Please select a Wallet option",
            icon: "error",
          });
          return;
        }
        selectedPayment = wallet === "Credit Card" ? `Card ending in ${cardNumber.slice(-4)}` : wallet;
        break;
  
      case "net-banking":
        if (!bank) {
          Swal.fire({
            title: "Error",
            text: "Please select a bank",
            icon: "error",
          });
          return;
        }
        selectedPayment = `${bank} Bank`;
        break;
  
      case "credit-card":
        if (!cardNumber || cardNumber.length < 4) {
          Swal.fire({
            title: "Error",
            text: "Please enter a valid card number",
            icon: "error",
          });
          return;
        }
        selectedPayment = `Card ending in ${cardNumber.slice(-4)}`;
        break;
  
      case "cod":
        selectedPayment = "Cash on Delivery";
        break;
  
      default:
        selectedPayment = "Unknown Payment Method";
    }
  
    Swal.fire({
      title: "Payment Successful",
      text: `You have selected ${selectedPayment} for ₹${amountPayable}`,
      icon: "success",
    }).then(() => {
        if(orderedType==="cart")
        {
            
            dispatch(clearCart())
        }
      navigate("/order-confirmation");
    });
  };
  

  return (
    <div className="complete-container "  >

     <div class="addresscontainer">
      <h4>DELIVERY ADDRESS</h4>
      <div class="address">{address.name}, {address.mobile}, {address.address}, {address.district}
        <button onClick={()=>navigate(`/address/${price}`)}>CHANGE</button>
      </div>
     </div>

    
    <div class="complete">
      
    <div className="transaction-container">
      <h2>Complete Your Purchase</h2>
      <p>Total Amount: ₹{amountPayable}</p>

      <div className="payment-options">
        <h4>Payment Options</h4>

        <div className="transaction-option">
          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => {
                setPaymentMethod("upi");
                setUpiApp("");
              }}
            />
                <img src={upi} alt="UPI Payment" style={{ width: "30px", height: "20px" }} />
            upi
        
          </label>
          <p>Pay instantly using your favorite UPI app.</p>
          {paymentMethod === "upi" && (
            <div className="sub-options">
              {["Google Pay", "PhonePe", "Paytm"].map((app) => (
                <label key={app}>
                  <input
                    type="radio"
                    name="upi-app"
                    value={app}
                    checked={upiApp === app}
                    onChange={(e) => setUpiApp(e.target.value)}
                  />
                  {app}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="transaction-option">
          <label>
            <input
              type="radio"
              name="payment"
              value="wallet"
              checked={paymentMethod === "wallet"}
              onChange={() => {
                setPaymentMethod("wallet");
                setWallet("");
              }}
            />
            <img src={walletImage} alt="UPI Payment" style={{ width: "60px", height: "80px" }} />
            Wallet
          </label>
          
          <p>Use your PhonePe wallet or a credit card for payment.</p>
          {paymentMethod === "wallet" && (
            <div className="sub-options">
              <label>
                <input
                  type="radio"
                  name="wallet"
                  value="PhonePe Wallet"
                  checked={wallet === "PhonePe Wallet"}
                  onChange={(e) => setWallet(e.target.value)}
                />
                <img src={phonepe} alt="UPI Payment" style={{ width: "50px", height: "30px" }} />
                PhonePe Wallet
              </label>
              <label>
                <input
                  type="radio"
                  name="wallet"
                  value="Credit Card"
                  checked={wallet === "Credit Card"}
                  onChange={(e) => setWallet(e.target.value)}
                />
                  <img src={card} alt="UPI Payment" style={{ width: "40px", height: "20px",marginRight:"10px" }} />
                Credit Card
              </label>
              {wallet === "Credit Card" && (
                <input
                  type="text"
                  placeholder="Enter Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="card-input"
                />
              )}
            </div>
          )}
        </div>

        <div className="transaction-option">
          <label>
            <input
              type="radio"
              name="payment"
              value="net-banking"
              checked={paymentMethod === "net-banking"}
              onChange={() => {
                setPaymentMethod("net-banking");
                setBank("");
              }}
            />
            Net Banking
          </label>
          <p>Securely pay using online banking from top banks.</p>
          {paymentMethod === "net-banking" && (
            <div className="sub-options">
              {["SBI", "HDFC", "ICICI", "Axis", "Kotak"].map((b) => (
                <label key={b}>
                  <input
                    type="radio"
                    name="bank"
                    value={b}
                    checked={bank === b}
                    onChange={(e) => setBank(e.target.value)}
                  />
                  {b} Bank
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="transaction-option">
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            Cash on Delivery
          </label>
          <p>Pay with cash when you receive your order.</p>
        </div>
      </div>

      <button className="pay-btn" onClick={handlePayment}>
        Proceed to Pay ₹{amountPayable}
      </button>
    </div>
    <div class="bill">
      <div class="pricedto">
        <h3>Price Details</h3>
        <h4 className="price" style={{color:"grey"}}>
        <h5>Price ({quantity} item)</h5>
            <h5>₹{price}</h5>
        </h4>
        <h4 className="price" style={{color:"grey",fontSize:"17px"}}>
            <h4 style={{fontSize:"17px"}}>Delivery Charges</h4>
            <div >
                    <span style={{textDecoration:" line-through",marginLeft:"15px"}}>₹{deliveryCharge}</span>
                    <span style={{ color: "green", textDecoration: "none", marginLeft: "5px" }}>FREE</span>
                    

            </div>
         </h4>
        <h4 className="price" style={{color:"grey"}}>
            <h5>Tax</h5>
            <h5>₹{tax}</h5>
        </h4>

        <h6 className="price" style={{color:"grey"}}>
            <h5>Platform fee</h5>
            <h5>₹3</h5>
        </h6>

        <h4 className="price" style={{color:"black"}}>
            <h4>Total Payable</h4>
            <h4 style={{marginLeft:"18px"}}>₹{amountPayable}</h4>
        </h4>

        <h4 className="price" style={{color:"green"}}>
            <h6>Your Total Savings on this order</h6>
            <h6 style={{marginLeft:"18px"}}>₹{parseFloat(price*0.2).toFixed(0)}</h6>
        </h4>
        </div>
        <div class="secure">
            <div class="shield">
                <GoShieldCheck style={{fontSize:"35px"}}></GoShieldCheck>
                <p>Safe and Secure Payments. Easy returns. 100% Authentic products</p>
            </div>
            <div class="info">
              <p>By continuing with the order,you confirm that you are above 18 years of age, and you agree to the Elegance's <a href="">Terms of Use</a>and <a href="">Privacy Policy</a></p>

            </div>
        </div>

    </div>
    </div>\
    </div>
  );
};

export default Transaction;
