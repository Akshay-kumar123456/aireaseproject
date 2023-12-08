import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";


import BackgroundImage from "../../component/Auth/assets/bg22.jpg";
import { useNavigate } from "react-router";
import axios from "axios";
//import { useNavigate } from "react-router";

function Signin(){
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
     
    let token = window.btoa(username+':'+password);
       
        console.log(token);
        axios.post('http://localhost:8081/user/login',{},{
         headers:{
           'Authorization':'Basic '+ token
          }
        })
        .then(function(response){
          localStorage.setItem('username',username)
          let name = response.data.name
          localStorage.setItem('name',name)
          localStorage.setItem('token',token)
          localStorage.setItem('id',response.data.id)
          localStorage.setItem('isLoggedIn',true)
          let role= response.data.user.role;
         
         switch(role){
          case'CUSTOMER':
          navigate('/component/Customer/home')
          break;
          case'AIRLINE':
          navigate('/component/Airline/dashboard')
          break;
          case'EXECUTIVE':
          navigate('/Executive/dashboard')
          break;
          default:

         }
          console.log(response.data)
        })
        .catch(function(error){
          setMsg('Invalid Credintials')
        })


    // if (username === "gagankumar@gmail.com" && password === "Gagan@421") {
    //   navigate('/component/Customer/home')
    //   setMsg(true); // Set signup success alert
    // } else {
    //   setShow(true); // Set incorrect username or password alert
    // }
   
    setLoading(false);

  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

    return(
        <div>
            <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage })` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded"  onSubmit={handleSubmit}>
        {/* Header */}
        
        <div className="h4 mb-2 text-center"><strong>Login</strong> </div>
        <hr/>
        {/* ALert */}

        {show && (
  <Alert
    className="mb-2"
    variant="danger"
    onClose={() => setShow(false)}
    dismissible
  >
    Incorrect username or password.
  </Alert>
)}

{msg ? (
  <Alert onClose={() => setMsg(false)} dismissible variant="danger">
   invalid credentials
  </Alert>
) : (
  ''
)}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label style={{textAlign:"initial"}}>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div >
             &nbsp;
        </div>
        {!loading ? (
          <Button className="w-100 mt-12" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        
        <span>
        <div className="d-grid justify-content-center">
         
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={()=>navigate('/customer/signup')}
          >
           <span >Didn't have an account</span> 
          </Button> 
        </div>
        <div className="d-grid justify-content-center">
          {/* <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button> */}
        </div></span>
      </Form>
      </div>
     
        </div>
    );
}
export default Signin;