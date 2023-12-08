import axios from "axios";
import Navairline from "./navairline";
import React, { useEffect, useState } from 'react';
import { AutoComplete } from "antd";
import { Form, Button, InputGroup, Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from "react-router";

function ADDflights(){
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

    axios.post(`http://localhost:8081/flight/add/${aid}`,data)
    .then((response) => {
        console.log(response.data);
        setSuccessMessage('Flight added successfully!');
      })
      .catch((error) => {
        console.error('Error adding flight:', error);
        setSuccessMessage('Failed to add flight. Please try again.');
      });
}









    return (
        <div>
            <Navairline/>
            <Container className="border p-4" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
      <h2>Add Flight</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form  >
        <Row>
          <Col md={6}>
            <Form.Group controlId="code">
              <Form.Label>Code:</Form.Label>
              <Form.Control type="text" value={code} className="border border-dark" onChange={(e) => setCode(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="departureTime">
              <Form.Label>Departure Time:</Form.Label>
              <Form.Control type="time" value={departureTime} className="border border-dark" onChange={(e) => setDepartureTime(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="departureDate">
              <Form.Label>Departure Date:</Form.Label>
              <Form.Control type="date" value={departureDate} className="border border-dark" onChange={(e) => setDepartureDate(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="arrivalDate">
              <Form.Label>Arrival Date:</Form.Label>
              <Form.Control type="date" value={arrivalDate} className="border border-dark" onChange={(e) => setArrivalDate(e.target.value)} required />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="availableSeats">
              <Form.Label>Available Seats:</Form.Label>
              <Form.Control type="number" className="border border-dark" min={0} value={availableSeats} onChange={(e) => setAvailableSeats(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="economyClassPrice">
              <Form.Label>Economy Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark" min={100} value={economyClassPrice} onChange={(e) => setEconomyClassPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="firstClassPrice">
              <Form.Label>First Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark" min={300} value={firstClassPrice} onChange={(e) => setFirstClassPrice(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="businessClassPrice">
              <Form.Label>Business Class Price:</Form.Label>
              <Form.Control type="number" className="border border-dark" min={300} value={businessClassPrice} onChange={(e) => setBusinessClassPrice(e.target.value)} required />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="source">Source:</Form.Label>
          <InputGroup>
            <AutoComplete
              options={route.map((route) => ({ value: route.departureCity }))}
              style={{ borderColor: "black", maxWidth: "800px" }}
              value={source}
              onChange={(value) => setSource(value)}
              className="w-75 mx-auto border border-dark rounded"
              placeholder="Select source"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="destination">Destination:</Form.Label>
          <InputGroup>
            <AutoComplete
              options={route.map((route) => ({ value: route.arrivalCity }))}
              style={{ borderColor: "black", maxWidth: "800px" }}
              value={destination}
              onChange={(value) => setDestination(value)}
              placeholder="Select destination"
              className="w-75 mx-auto border border-dark rounded"
            />
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="button" onClick={handleaddflight}>
  Add Flight
</Button>
      </Form>
    </Container>
        </div>
    )
}
export default ADDflights;