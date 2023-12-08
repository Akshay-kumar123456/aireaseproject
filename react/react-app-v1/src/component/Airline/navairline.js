import React from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import BackgroundImage from "/React start/React1/airease/src/component/assets/SAVE_20231021_182600-removebg-preview.png";
import { useNavigate } from "react-router";

function Navairline(){

  const navigate = useNavigate();
  
  const airlineId = localStorage.getItem('id');

  const Addflights = () => {
    // Retrieve customer ID from local storage
    const airlineId = localStorage.getItem('id');

    // Navigate to the search flights page with customer ID as a parameter
    navigate('/airline/addflights/'+airlineId);
  };
  const handleallFlights = () => {
    // Retrieve customer ID from local storage
   

    // Navigate to the search flights page with customer ID as a parameter
    navigate('/airline/allflights/'+airlineId);
  };

return(
    <div>
        <Navbar bg="light" style={{height:100}} data-bs-theme="light">
        <Container>
          <Navbar.Brand  onClick={()=>navigate('/airline/dashboard')} ><Image className='logo' src={BackgroundImage} /></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link className='navitems'onClick={()=>navigate('/airline/home/'+airlineId)} >Home</Nav.Link>
          
            <Nav.Link className='navitems' onClick={()=>navigate('/airline/about')}>About Us</Nav.Link>
            {
               localStorage.getItem('isLoggedIn')?<React.Fragment><Nav.Link className='navitems' onClick={handleallFlights}>All Flights</Nav.Link>
               <Nav.Link className='navitems'  onClick={Addflights} >Add flights</Nav.Link></React.Fragment>:' '
            }
            
          </Nav>
          {
            localStorage.getItem('isLoggedIn')?<Navbar.Text className='navitems1'>
            Signed in as: {localStorage.getItem('name')}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="outline-dark" onClick={()=> {localStorage.clear(); navigate('/auth/login')}}>Logout</Button>
            </Navbar.Text>: 
          <React.Fragment>
             <Button variant="primary" className='navitems1'  onClick={()=>navigate('/airline/signup')} >Signup</Button>
           <Button variant="outline-dark" className='navitems1' onClick={()=>navigate('/auth/login')} >Login</Button>
        
         </React.Fragment> }
        </Container>
       
      </Navbar>
     <hr style={{width:1300}}/>
    </div>
)    
}
export default Navairline;