
import { Alert, Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import axios from 'axios';

const Removeflight = ({ flightId, date }) => {
  const [agreed, setAgreed] = useState(false);
  const [msg, setMsg] = useState(false);
 


const handleremoveflight=()=>{

  axios.delete(`http://localhost:8081/flight/delete/${flightId}`)
  .then(response=>console.log(response.data))
  setMsg("flight deleted successfully")
}
  return (
    <div>
      <h2>Remove Flight</h2>
      {msg && <Alert variant="success">{msg}</Alert>}
      <p>Flight ID: {flightId}</p>
      <p>Departure Date: {date}</p>

      
                <input
                  className="dark-checkbox"
                  type="checkbox"
                  label="I accept"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  required
                /> I accept Terms and Conditions <br/>
             

      <Button  variant="danger" onClick={handleremoveflight}
        style={{ height: 40, width: 200 }}  disabled={!agreed}>Remove flight</Button>
 
    </div>
  );
};

export default Removeflight;
