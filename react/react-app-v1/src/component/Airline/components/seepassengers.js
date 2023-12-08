// Passengerslist.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const Passengerslist = ({ flightId, date }) => {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/customerflight/flight/passengers/${flightId}/${date}`)
      .then((response) => {
        setPassengers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching passengers:', error);
      });
  }, [flightId, date]);

  return (
    <div>
      <Container className="border p-4" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
        <br/>
      <h2>Passengers List</h2>
      <Table striped bordered hover  className="table table-secondary">
        <thead>
          <tr>
            <th>Booking Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Seat No</th>
            <th>Seat Class</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.id}>
              <td>{passenger.id}</td>
              <td>{passenger.name}</td>
              <td>{passenger.age}</td>
              <td>{passenger.gender}</td>
              <td>{passenger.seat.seatNo}</td>
              <td>{passenger.seat.seatclass}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
    </div>
  );
};

export default Passengerslist;
