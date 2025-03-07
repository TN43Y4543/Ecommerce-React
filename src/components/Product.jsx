import React, { useState, useEffect } from "react";
import "../components/product.css";
import { useDispatch,useSelector} from "react-redux"
import { addItem} from "../store/cartSlice"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import product from "../assets/products"

const Product = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("all");
  const [filter, setFilter] = useState(product);
  let navigate=useNavigate();
  

  useEffect(() => {
    filterProducts(name, category);
  }, [category, name]); // Update on category or name change

  function filterProducts(searchText, selectedCategory) {
    let filteredData = product.filter((item) => {
      return (
        (selectedCategory === "all" || item.category === selectedCategory) &&
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilter(filteredData);
  }

  function handleFilter(e) {
    const data = e.target.value;
    setName(data);
    filterProducts(data, category);
  }

  // Sort products from low to high price
  function lowToHigh() {
    const sortedProducts = [...filter].sort((a, b) => a.price - b.price);
    setFilter(sortedProducts);
  }

  // Sort products from high to low price
  function highToLow() {
    const sortedProducts = [...filter].sort((a, b) => b.price - a.price);
    setFilter(sortedProducts);
  }


  let cartState=useSelector((state)=>{return state.cart})

let dispatch=useDispatch()
function addItemToCart(product)
{


  dispatch(addItem( product))
  Swal.fire({
    title:"Success",
    text:"Product Added Successfully",
    icon:"success"

  });
}

  function buyProduct(price)
  {
    let quantity=1;
    let orderType="direct"
    navigate(`/transaction/${price}/${quantity}/${orderType}`)
  }



  return (
    <div className="product">
      <div className="header">
        <div className="category">
          <label htmlFor="">Category</label>
          <br />
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="all">All</option>
            <option value="kids">Kids</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <div className="search">
          <label htmlFor="">Search</label>
          <br />
          <p className="wrap">
            <input
              type="text"
              placeholder="Search Products"
              value={name}
              onChange={handleFilter}
            />
            <button className="searchbtn">Search</button>
            <button className="lowbtn" style={{backgroundColor:"grey"}}  onClick={lowToHigh}>Low</button>
            <button className="highbtn" style={{backgroundColor:"grey"}} onClick={highToLow}>High</button>
          </p>
        </div>
      </div>

      <ul className="body">
        {filter.map((p, index) => {
          const isInCart = cartState.some((item) => item.id === p.id);

          return (
            <li key={p.id} onClick={() => navigate(`/details/${p.id}`)}>
              <p className="img" >
                <img src={p.image} alt={p.name} />
              </p>
              <p className="item">
                <p className="name one">{p.name}</p>
                <p className="size one">{p.size}</p>
                <p className="price one">₹{p.price}</p>
                <p className="button">
                  <button onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking the button
                    addItemToCart(p);
                  }}>
                    Add to Cart
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking the button
                   buyProduct(p.price);
                  }}>
                    Buy Now
                  </button>
                </p>
                {/* Show message if the item is in the cart */}
                {isInCart && <p style={{ color: "green", marginTop: "10px" }}>Item added to cart ✅</p>}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Product;