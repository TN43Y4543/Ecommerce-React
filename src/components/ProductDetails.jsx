import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import product from "../assets/products"// Ensure this is an array
import Card from 'react-bootstrap/Card';
import { useDispatch,useSelector} from "react-redux"
import { addItem} from "../store/cartSlice"
import Swal from 'sweetalert2'

const ProductDetails = () => {
    let { id } = useParams();
    let navigate=useNavigate();
 
     
    let data = product.find((e) => e.id === Number(id)); // `find` returns an object
  
   

    // Handle case when product is not found
    if (!data) {
        return <h2>Product Not Found</h2>;
    }

     let cartState=useSelector((state)=>{return state.cart})
    let dispatch=useDispatch()
    const isInCart = cartState.some((item) => item.id === data.id);
    function addItemToCart(product)
    {
    
      dispatch(addItem( product))
      Swal.fire({
        title:"Success",
        text:"Product Added Successfully",
        icon:"success"
    
      });
   
    }
    function proceedToBuy(price)
    {
      let quantiy=1;
      let orderType="direct";
      navigate(`/transaction/${price}/${quantiy}/${orderType}`)
    }

    return (
        <div style={{backgroundColor:"lightblue"}}>
          <Card key={data.id}style={{ maxwidth: '50rem',backgroundColor:"white",margin:"40px 40px" }} className='product'>
                  <center>
                <Card.Img variant="top" src={data.image} style={{width: "16rem",height:"18rem"}}/>
                </center>
                <Card.Body>
                  <div className='dive'>
                  <Card.Title style={{textAlign:"center"}}>{data.name}</Card.Title>
                  <Card.Text  style={{textAlign:"center",fontWeight:"500",}}>
                  {data.size}
                  </Card.Text>
                  <Card.Text   style={{textAlign:"center",fontWeight:"bolder",color:"blue",fontSize:"24px"}} >
                  ₹{data.price}
                  </Card.Text>
                  </div>
                          {/* Show success message if item is in the cart */}
                {isInCart && (
                <p style={{ color: "green", textAlign:"center" }}>
                   ✅ Item added to cart
                </p>
                )}

                </Card.Body>
                <Card.Footer style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",height:"60px"}}>
                <p className="button">
                <button onClick={()=>addItemToCart(data)}>Add to Cart</button>
                <button onClick={()=>proceedToBuy(data.price)}>Buy Now</button>
              </p>
                  
              
                </Card.Footer>
              </Card>
              </div>
    );
};

export default ProductDetails;
