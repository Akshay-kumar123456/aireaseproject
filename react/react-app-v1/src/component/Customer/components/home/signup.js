import "/React start/React1/airease/src/component/Customer/components/home/signup.css";
import axios from 'axios';
import BackgroundImage from "/React start/React1/airease/src/component/Auth/assets/bg22.jpg";
import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router";
//import { useSearchParams } from "react-router-dom";
function Signup() {
 // const[param]=useSearchParams();
  
  const [agreed, setAgreed] = useState(false);
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setMsg] = useState("");
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);

  let [nameMsg,setNameMsg] = useState('');
  let [emailMsg,setEmailMsg] = useState('');
  let [passwordMsg,setPasswordMsg] = useState('');










  //const handlePassword = () => {};
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    let customer1 = {
      name: name,
      age: age,
      gender: gender,
      email: email,
      phone: contact,
      user: {
        username: email,
        password: password
      }
    };

    console.log(customer1);
    setCustomer(customer1)
    

    axios
      .post("http://localhost:8081/customer/signup", customer1)
      .then((response) => {
        setCustomer(response.data);
        setMsg("signup successful"); // Set a message indicating success
        setLoading(false);
        navigate('/auth/login');
      })
      .catch((error) => {
        setMsg("signup failed"); // Set a message indicating failure
        setLoading(false);
      });
    }
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    

//     name: [a-zA-Z ]+ 
// small a-z is allowed , capital A-Z is allowed and space is allowed


// (^[a-zA-Z0-9_ -]+@[a-zA-Z0-9_-]+\.[a-zA-Z]+$)

// Part 1: [a-zA-Z0-9_ -]+
// @
// Part 2: [a-zA-Z0-9_-]+ : only one char 
// \.
// Part 3: [a-zA-Z]+



// [a-zA-Z0-9.-_]+ : john, 8-9, 8.8-8, 8

// ?=.*[A-Z] : atleast one
// ?=.*[0-9]: atleast one
// ?=.*[$#%@_-.] : atleast one
// [a-zA-Z0-9.-_]+ : your choice

// (^(?=.*[A-Z])(?=.*[0-9])(?=.*[$#%@_-.])[a-zA-Z0-9.-_]+$)
 
const process=()=>{
         
  console.log(name + '--' + email + '--' + password+'--'+confirmPassword);
        let user={
            'name': name,
            'email': email,
            'password': password
        }
        if (password===confirmPassword){
        let status = validate(user);

        if(status === true){
            console.log('sign up success ')

           
        }
        else{
            console.log('sign up unsuccessful, wait ')
        }}
        else{
          setMsg('password didnot matched')
        }
}
const validate = (user)=>{
  if(user.name === ''){
      setNameMsg('name is required')
      return false
  }
  else 
  if(!(user.name.match(/(^[a-zA-Z ]+$)/))){
      
      setNameMsg('small and capital characters(az- A-Z) with spaces are allowed')
      return false
  }
  else{
      setNameMsg('')
  }

  if(user.email === ''){
      setEmailMsg('email is required')
      return false
  }
  else 
  if(!user.email.match(/(^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]+$)/)){ 
      setEmailMsg('email should be valid: ex. john@example.com')
      return false
  }
  else{
      setEmailMsg('')
  }

  if(user.password === ''){
      setPasswordMsg('password is required')
      return false
  }
  else 
  if(!user.password.match(/(^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$)/)){
      setPasswordMsg('password must follow following rules: one special char, atleast captial letter, atleast 1 digit0-9')
      return false
  }
  else{
      setPasswordMsg('')
  }

  return true
}




   
 
  
  return (
    <div>
{/* import { useState } from "react";

function ReadingInput(){
    let [name,setName] = useState('');
    let [email,setEmail] = useState('');
    let [password,setPassword] = useState('');

    let [nameMsg,setNameMsg] = useState('');
    let [emailMsg,setEmailMsg] = useState('');
    let [passwordMsg,setPasswordMsg] = useState('');
    
    const process=()=>{   //REGEX
        console.log(name + '--' + email + '--' + password);
        let user={
            'name': name,
            'email': email,
            'password': password
        }
        let status = validate(user);

        if(status === true){
            console.log('sign up success, call API ')
        }
        else{
            console.log('sign up unsuccessful, wait ')
        }
    }

    const validate = (user)=>{
        if(user.name === ''){
            setNameMsg('name is required')
            return false
        }
        else 
        if(!(user.name.match(/(^[a-zA-Z ]+$)/))){
            console.log('line 36...')
            setNameMsg('small and capital characters(az- A-Z) with spaces are allowed')
            return false
        }
        else{
            setNameMsg('')
        }

        if(user.email === ''){
            setEmailMsg('email is required')
            return false
        }
        else 
        if(!user.email.match(/(^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z]+$)/)){ //a@b.com
            setEmailMsg('email should be valid: ex. john@example.com')
            return false
        }
        else{
            setEmailMsg('')
        }

        if(user.password === ''){
            setPasswordMsg('password is required')
            return false
        }
        else 
        if(!user.password.match(/(^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$)/)){
            setPasswordMsg('password must follow following rules: one special char, atleast captial letter, atleast 1 digit0-9')
            return false
        }
        else{
            setPasswordMsg('')
        }

        return true
    }

    return(
        <div>
            <h3>Reading input from User: </h3>

            <div>
                <label>Please enter your name: </label>
                <input type="text" onChange={(e)=>setName(e.target.value) }/>
                <span>{nameMsg}</span>
                <br />
                <label>Please enter your email: </label>
                <input type="text" onChange={(e)=>setEmail(e.target.value) }/>
                <span>{emailMsg}</span>
                <br />
                <label>Please enter your Password: </label>
                <input type="text" onChange={(e)=>setPassword(e.target.value) }/>
                <span>{passwordMsg}</span>
                <br />
                
                <button onClick={()=>process()}>Sign Up</button>
            </div>
        </div>
    )
}

export default ReadingInput;              



 */}











      <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="sign-in__backdrop  text-left"></div>

        <Form className="shadow p-4 bg-white rounded" onSubmit= {handleSubmit}>
          <div className="h4 mb-2 text-center">
            <strong>Signup</strong>{" "}
          </div>

          <hr />
           <div>
           {msg ? (
  <Alert onClose={() => setMsg(false)} dismissible variant="success">
    signup successful
  </Alert>
) : (
  ''
)}
           </div>
         
          <Row>
            <Col md="6">
              <span>{setMsg}</span> 
              {/* First Row */}
              <Form.Group className="mb-2" controlId="name">
             
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  style={{ width:330,display:"flex"  }}
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="Age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  min={18}
                  value={age}
                  style={{ width: 330,display:"flex" }}
                  placeholder="Enter your Age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="gender">
                <Form.Label> Gender</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  style={{ width: 330,display:"flex" }}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="" style={{ color: "light grey" }} disabled>
                    Select your Gender...
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-2" controlId="contact">
                <Form.Label className="text-left">Contact number</Form.Label>
                <Form.Control
                  style={{ width: 330,display:"flex" }}
                  type="tel"
                  placeholder="Enter your contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>

            <Col md="6">
              {/* Second Row */}
              <Form.Group className="mb-2" controlId="email">
              <span>{emailMsg}</span>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  style={{ width: 330 ,display:"flex"}}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  style={{ width: 330 ,display:"flex"}}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  style={{ width: 330 ,display:"flex" }}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
    

              <Form.Group controlId="agree">
                <Form.Check
                  className="dark-checkbox"
                  type="checkbox"
                  label="I agree to the terms and conditions"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  required
                />
              </Form.Group>
  
              {loading ? (
  <Button className="w-100" variant="primary" type="submit" disabled>
    Signing Up...
  </Button>
) : (
  <Button
    className="w-100 mt-12"
    style={{ width: 100 }}
    variant="primary"
    type="submit"
    disabled={!agreed}
  >
    Signup
  </Button>
)}

              <div className="d-grid justify-content-center">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={()=>navigate('/auth/login')}
          >
            Already had an account
          </Button>
        </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
export default Signup;
