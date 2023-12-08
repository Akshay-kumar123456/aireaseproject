import React from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import BackgroundImage from "/React start/React1/airease/src/component/assets/SAVE_20231021_182600-removebg-preview.png";
import { useNavigate } from "react-router";

function NavExecutive() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar bg="light" style={{ height: 100 }} data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={() => navigate('/Executive/dashboard')}>
            <Image className='logo' src={BackgroundImage} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className='navitems' style={{ fontSize: '16px' }} >Home</Nav.Link>
            <Nav.Link className='navitems' onClick={() => navigate('/executive/about')} style={{ fontSize: '16px' }}>About Us</Nav.Link>
            {localStorage.getItem('isLoggedIn') ?
              <React.Fragment>
                <Nav.Link className='navitems' style={{ fontSize: '16px' }}>All Airlines</Nav.Link>
                <Nav.Link className='navitems' style={{ fontSize: '16px' }}>Add Airlines</Nav.Link>
              </React.Fragment> : ' '
            }
          </Nav>
          {
            localStorage.getItem('isLoggedIn') ? <Navbar.Text style={{ fontSize: '16px' }} className='navitems1'>
              Signed in as: {localStorage.getItem('name')}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-dark" onClick={() => { localStorage.clear(); navigate('/auth/login') }}>Logout</Button>
            </Navbar.Text> :
              <React.Fragment>
               
                <Button variant="outline-dark" className='navitems1' onClick={() => navigate('/auth/login')}>Login</Button>
              </React.Fragment>
          }
        </Container>
      </Navbar>
      <hr style={{ width: 1300 }} />
    </div>
  );
}

export default NavExecutive;
