import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "/React start/React1/airease/src/component/Customer/components/home/nav.css";
import BackgroundImage from "/React start/React1/airease/src/component/assets/SAVE_20231021_182600-removebg-preview.png";
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import React from 'react';
function NavbarcomponentWL(){
  const navigate = useNavigate();
  const customerId = localStorage.getItem('id');

  const handleSearchFlights = () => {
    // Retrieve customer ID from local storage
    const customerId = localStorage.getItem('id');

    // Navigate to the search flights page with customer ID as a parameter
    navigate('/search/flights/'+customerId);
  };
return(
  <div className='container '>
   <Navbar bg="light" style={{height:100}} data-bs-theme="light">
        <Container>
          <Navbar.Brand  href="#home"><Image className='logo' src={BackgroundImage} /></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link className='navitems'onClick={()=>navigate('/component/Customer/home')} >Home</Nav.Link>
          <Nav.Link className='navitems' onClick={handleSearchFlights}>Search Flights</Nav.Link>
            <Nav.Link className='navitems' onClick={()=>navigate('/about')}>About Us</Nav.Link>
            {
               localStorage.getItem('isLoggedIn')?<Nav.Link className='navitems'  onClick={()=>navigate('/Bookings/'+customerId)} >Previous Bookings</Nav.Link>:' '
            }
            
          </Nav>
          {
            localStorage.getItem('isLoggedIn')?<Navbar.Text className='navitems1'>
            Signed in as: {localStorage.getItem('name')}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outline-dark" onClick={()=> {localStorage.clear(); navigate('/auth/login')}}>Logout</Button>
          </Navbar.Text>: 
          <React.Fragment>
             <Button variant="primary" className='navitems1'  onClick={()=>navigate('/customer/signup')} >Signup</Button>
           <Button variant="outline-dark" className='navitems1' onClick={()=>navigate('/auth/login')} >Login</Button>
        
         </React.Fragment> }
        </Container>
       
      </Navbar>
     <hr style={{width:1300}}/>
</div>
);
}
export default NavbarcomponentWL;