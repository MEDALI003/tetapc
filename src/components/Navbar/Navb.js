import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";
import { logout } from '../../JS/ACTIONS/actions';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { get_product } from '../../JS/ACTIONS/productActions';
import React from 'react';



function Navb() {
  const dispatch=useDispatch()
  const basket=useSelector(state=>state.basket.newbasket)
  const user =useSelector(state=>state.user.user)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const product=useSelector(state=>state.product.product)
  const fix=0
  useEffect(()=>{
    const getting=async()=>{
      while (product===null) {
        await dispatch(get_product())
      }
      
    }
   
    getting()
    
  },[fix])
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid >
      <Navbar.Brand as={Link} to="/">
          <img
            src={"https://res.cloudinary.com/dvdx4mvqx/image/upload/v1712874468/s61yodqkyheunf6gohcw.png"}
            alt="Navbar Logo"
            width="100"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',display:"flex",justifyContent:"space-around" }}
            navbarScroll
          >
            
            <Nav.Link ><Link to={"/"} style={{ textDecoration: "none",color:"black" }}>Home</Link></Nav.Link>
            <Nav.Link style={(user && user.prefileges === "Admin") ? { display: "flex" } : { display: "none" }}>
  <Link to="/addproduct" style={{ textDecoration: "none", color: "black", display: "flex" }}>Add product</Link>
</Nav.Link>
<Nav.Link style={(user && user.prefileges === "Admin") ? { display: "flex" } : { display: "none" }}>
  <Link to="/facture/admin" style={{ textDecoration: "none", color: "black", display: "flex" }}>See commandes</Link>
</Nav.Link>
            
          </Nav>
          
          <Nav.Link style={{display:"flex",justifyContent:"space-around",marginTop:"10px"}} ><FontAwesomeIcon  style={{paddingTop:"1.5px"}}icon={faCartShopping} onClick={handleShow} /><p style={{paddingRight:"20px"}}>({!basket?0:basket.length})</p><Link to={"/"} style={user?{ textDecoration: "none",color:"black" ,display:"flex"}:{display:"none"}} onClick={()=>dispatch(logout())}><FontAwesomeIcon icon={faRightFromBracket} /></Link><Link to={"/login"} style={!user?{ textDecoration: "none",color:"black" ,display:"flex"}:{display:"none"}}><FontAwesomeIcon icon={faUser} /></Link></Nav.Link>

        </Navbar.Collapse>
        <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title ><div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Basket</div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <table>
    {basket.map(el => (
      <tr key={el.productId} style={{borderBottom:"1px solid grey"}}>
        {product?.map(e => {
          if (e._id === el.productId) {
            return (
              <React.Fragment key={e._id}>
                <th>{e.name}</th>
                <td style={{width:"30px",textAlign:"center"}}>{el.quantity}</td>
              </React.Fragment>
            );
          }
          return null;
        })}
      </tr>
    ))}
  </table>
</Modal.Body>

        <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
        <Link to={"/facture"} style={{ textDecoration: "none",color:"white" }}>
            Confirm the order
          </Link>
          </Button>

          <Button variant="secondary" onClick={handleClose} style={{color:"white"}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      </Container>
    </Navbar>
  );
}

export default Navb;