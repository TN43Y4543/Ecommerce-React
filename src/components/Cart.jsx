import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { MdDelete } from "react-icons/md";
import { removeItem } from '../store/cartSlice';
import { addItem,clearCart} from "../store/cartSlice"
import { decreaseQuantity} from "../store/cartSlice"
import "../components/Cart.css"
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const Cart = () => {
let cartProducts=useSelector((state)=>{return state.cart})
let navigate=useNavigate()
const quantity = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
let[error,setError]=useState("")
let orderType="cart"

let dispatch= useDispatch()
let handleDelete=(reduxItemId)=>{
  dispatch(removeItem(reduxItemId))
    Swal.fire({
      title:"Deleted",
      text:"Product Deleted from Cart",
      icon:"Deleted"
  
    });
 
}

let subtotal = cartProducts.reduce((total, product) => total + product.price * product.quantity, 0);

function increment(product)
{
  dispatch(addItem( product))

}
function decrement(product)
{
  if (product.quantity > 1) {
    dispatch(decreaseQuantity(product.id));
} else {
    dispatch(removeItem(product.id));  // Remove item if quantity reaches 0
}

}

function handleClearCart()
{
  console.log("clear cart")
  dispatch(clearCart());
}

function proceedToBuy()
{
  if(cartProducts.length!==0)
  {
    setError("")
    navigate(`/transaction/${subtotal}/${quantity}/${orderType}`)

  }
  else{
        setError("No product to Buy")
  }
  
}
  return (
    <div>

      <h1 style={{textAlign:"center"}}>Shopping Cart<button className='clear' onClick={handleClearCart}>Clear Cart</button></h1>

      <div class="cartpage">

      <section className='pricelist'>

        <p>
          <input type="radio"/>
          <span class="green" style={{color:"green"}}>Part of your order qualifies for FREE Delivery.</span>
          <span className='white'  style={{color:"black"}}> Choose <a href="" style={{textDecoration:"none"}}>FREE Delivery</a> option at checkout.</span> 
        </p>

          <h3><h4>Subtotal</h4><h4>₹{subtotal}</h4></h3>

          <p><input type="checkbox"/>This order contains a gift</p>
          <button onClick={proceedToBuy}>Proceed to Buy</button>
          <p style={{color:"red"}}>{error}</p>

       </section>
        
        {
          
          cartProducts.length!==0? (
        
        <section className='products'>
          {
            
            cartProducts.map((product)=>{
              return(   
                
                 <Card key={product.id}style={{ width: '20rem' }} className='product' onClick={() => navigate(`/details/${product.id}`)}>
                  <center>
                <Card.Img variant="top" src={product.image} style={{width: "100%",height:"18rem"}}/>
                </center>
                <Card.Body>
                  <div className='dive'>
                  <Card.Title style={{textAlign:"center"}}>{product.name}</Card.Title>
                  <Card.Text  style={{textAlign:"center",fontWeight:"500",}}>
                  ₹{product.size}
                  </Card.Text>
                  <Card.Text   style={{textAlign:"center",fontWeight:"bolder",color:"blue",fontSize:"24px"}} >
                  ₹{product.price}
                  </Card.Text>
                  </div>
                </Card.Body>
                <Card.Footer style={{display:"flex",justifyContent:"space-evenly",alignItems:"center" }}>
                  
                <Button variant='danger' onClick={(e)=>{e.stopPropagation();handleDelete(product.id)}}><MdDelete/></Button>
                <p className='count'><button className='increment' onClick={(e)=>{e.stopPropagation();increment(product)}}>+</button>{product.quantity}<button className='decrement' onClick={(e)=>{e.stopPropagation();decrement(product)}}>-</button></p>
                </Card.Footer>
              </Card>)
            })
          }
        </section>)
        :<div style={{textAlign:"center"}}>
          <h1>Please Purchase Something</h1>
          <Button variant='primary' onClick={()=>{navigate("/products")}}>Add Products</Button>
        </div>
        
        }
       
        </div>
  
      
    </div>
  )
}

export default Cart
