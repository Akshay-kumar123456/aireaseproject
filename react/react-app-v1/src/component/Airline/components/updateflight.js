import axios from "axios";

import  { useEffect, useState } from 'react';
import { AutoComplete } from "antd";
import { Form, Button, InputGroup, Container, Col, Alert } from 'react-bootstrap';
import { useParams } from "react-router";
import React from 'react';


const Updateflights = ({ flightId, date }) => {
  // You can use flightId and date in your component logic

  const{aid}=useParams();
    const [route, setRoute] = useState([]);
    const [code, setCode] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
   const [availableSeats, setAvailableSeats] = useState(0);
   const [economyClassPrice, setEconomyClassPrice] = useState(0);
   const [firstClassPrice, setFirstClassPrice] = useState(0);
   const [businessClassPrice, setBusinessClassPrice] = useState(0);
   const [source, setSource] = useState('');
   const [destination, setDestination] = useState('');
   const [successMessage, setSuccessMessage] = useState(null);


   useEffect(() => {
   
    axios
    .get("http://localhost:8081/route/getall")
    .then((response) => {
      const routes = response.data;
      console.log('Routes:', routes); 
      setRoute(routes);
    })
    .catch((error) => {
      console.error("Error fetching routes:", error);
    });

    


},[ ])



   const handleaddflight=(e)=>{
    e.preventDefault();

   let data ={
    "code":code,
   "departureTime":  departureTime,
    "departureDate": departureDate,
    "arrivalDate": arrivalDate,
    "availableSeats":availableSeats,
    "economyClassPrice": economyClassPrice,
    "firstClassPrice": firstClassPrice,
    "businessClassPrice": businessClassPrice,
    "source": source,
   "destination":  destination
   }
    
    console.log(data);
    console.log(aid);

    axios.put(`http://localhost:8081/flight/update/${flightId}/${date}`,data)
    .then((response) => {
        console.log(response.data);
        setSuccessMessage('Flight updated successfully!');
      })
      .catch((error) => {
        console.error('Error adding flight:', error);
        setSuccessMessage('Failed to update flight. Please try again.');
    });
    }
  return (
    <div>
           
            <Container className="border p-4" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Update Flight Information</h2>
        <button >View Routes List</button>
      </div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form  >
        
          <Col >
            <Form.Group controlId="code">
              <Form.Label>Code:</Form.Label>
              <Form.Control type="text" value={code} className="border border-dark mx-auto" style={{maxWidth:600}} onChange={(e) => setCode(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="departureTime">
              <Form.Label>Departure Time:</Form.Label>
              <Form.Control type="time" value={departureTime} className="border border-dark mx-auto" style={{maxWidth:600}} onChange={(e) => setDepartureTime(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="departureDate">
              <Form.Label>Departure Date:</Form.Label>
              <Form.Control type="date" value={departureDate} className="border border-dark mx-auto" style={{maxWidth:600}} onChange={(e) => setDepartureDate(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="arrivalDate">
              <Form.Label>Arrival Date:</Form.Label>
              <Form.Control type="date" value={arrivalDate} className="border border-dark mx-auto" style={{maxWidth:600}} onChange={(e) => setArrivalDate(e.target.value)} required />
            </Form.Group>
          </Col>

          <Col >
            <Form.Group controlId="availableSeats">
              <Form.Label>Available Seats:</Form.Label>
              <Form.Control type="number" className="border border-dark mx-auto" min={0}  style={{maxWidth:600}} value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="economyClassPrice">
              <Form.Label>Economy Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark mx-auto" min={100} style={{maxWidth:600}} value={economyClassPrice} onChange={(e) => setEconomyClassPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="firstClassPrice">
              <Form.Label>First Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark mx-auto " min={300} style={{maxWidth:600}} value={firstClassPrice} onChange={(e) => setFirstClassPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="businessClassPrice">
              <Form.Label>Business Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark mx-auto" min={300} style={{maxWidth:600}} value={businessClassPrice} onChange={(e) => setBusinessClassPrice(e.target.value)} required />
            </Form.Group>
          </Col>
       

        <Form.Group className="mb-3">
          <Form.Label htmlFor="source">Source:</Form.Label>
          <InputGroup>
            <AutoComplete
              options={route.map((route) => ({ value: route.departureCity }))}
              style={{ borderColor: "black", maxWidth: "600px" }}
              value={source}
              onChange={(value) => setSource(value)}
              className="w-75 mx-auto border border-dark rounded"
              placeholder="Select source" required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="destination">Destination:</Form.Label>
          <InputGroup>
            <AutoComplete
              options={route.map((route) => ({ value: route.arrivalCity }))}
              style={{ borderColor: "black", maxWidth: "600px" }}
              value={destination}
              onChange={(value) => setDestination(value)}
              placeholder="Select destination"
              className="w-75 mx-auto border border-dark rounded" requireds
            />
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleaddflight}>
  Update Flight
</Button>
      </Form>
    </Container>
        </div>
  );
};

export default Updateflights;
