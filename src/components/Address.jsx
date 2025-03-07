import { useState } from "react";
import { useDispatch } from "react-redux";
import { setDeliveryAddress } from "../store/addressSlice"
import "../components/Address.css"
import { useNavigate, useParams } from "react-router-dom";
import bgimg from "../assets/free.avif"


const AddressForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
    let navigate=useNavigate()
  const dispatch = useDispatch();
  let {price}=useParams();
    let quantity=1;
    let orderType="direct"

  const handleSaveAddress = () => {
    if (!name || !mobile || !address || !district) {
      alert("Please fill in all fields.");
      return;
    }

    // Dispatch an object containing the full delivery details
 
    dispatch(setDeliveryAddress({ name, mobile, address, district }));
    alert("Address saved successfully!");
    
    // Clear input fields after saving
    setName("");
    setMobile("");
    setAddress("");
    setDistrict("");
  };

  return (
    <div class="container"  style={{
            backgroundImage: `url(${bgimg})`, // Correct way to set background image
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
    <div className="delivery" >
      <h2>Enter Delivery Address</h2>
      
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      <input
        type="tel"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <br />

      <input
        type="text"
        placeholder="District"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      />
      <br />

      <button onClick={handleSaveAddress}>Save Address</button>
      <button onClick={()=>navigate(`/transaction/${price}/${quantity}/${orderType}`)} style={{backgroundColor:"grey"}}>Go Back</button>
    </div>
    </div>
  );
};

export default AddressForm;
