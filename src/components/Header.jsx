import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link ,useNavigate} from 'react-router-dom';
import { IoCartOutline } from "react-icons/io5";
import { useSelector} from 'react-redux'
import "../components/Header.css"
import { useState } from 'react';



const Header = () => {
  let navigate=useNavigate();
  let cartProducts=useSelector((state)=>{return state.cart})
  const totalCartCount = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
  const [selectedOption, setSelectedOption] = useState("");


  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);

    if (value === "login") {
      navigate("/login");
    } else if (value === "signup") {
      navigate("/signup");
    }
  };

  return (
    <div className='Header' >
     <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{fontSize:"25px",color:"black"}}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/review">Reviews</Nav.Link>
           
          </Nav>
          <Form className="d-flex">
            
          <select className="select" value={selectedOption} onChange={handleChange}>
            <option value="">select</option>
            <option value="login">Login</option>
            <option value="signup">Sign Up</option>
        </select>
          <Button variant="primary" onClick={() => navigate("/wishlist")} style={{ position: "relative" }}>
            {/* Cart Icon */}
            <IoCartOutline style={{ fontSize: "20px", position: "relative" }} />
            
            {/* Cart Badge */}
            {cartProducts.length > 0 && (
                <span className="cart-badge">
                    {totalCartCount}
                </span>
            )}
        </Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
