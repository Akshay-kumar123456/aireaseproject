import { useEffect, useState } from "react";
import NavbarcomponentWL from "../home/navbarf";
import { Button, Image } from "react-bootstrap";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Table } from 'react-bootstrap';

function PreviousBookings(){
    const [bookings,setBookings]=useState([ ]);
    const {  customerId } = useParams();

  

    useEffect(()=>{
        console.log(customerId)
   
        axios.get(`http://localhost:8081/customerflight/bookings/${customerId}`).then(response=>setBookings(response.data))
      
        
      
      
      },[ ])



    return (
      <div>
        <NavbarcomponentWL />

        <div>
          <h4>Previous Bookings</h4>
          {/* <div className="row">
            {flight1.map((flight) => (
              <div key={flight.id} className="col-md-6 mb-4">
                <Accordion
                  className="mt-4 mb-4"
                  defaultActiveKey="0"
                  key={flight.id}
                >
                  <Accordion.Item
                    style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
                  >
                    <Accordion.Header>
                      <div className="d-flex justify-content-between">
                        <div className="col-md-10">
                          <div>
                            <h3>{flight.airline.name}</h3>
                          </div>
                          <div>
                            <p>
                              {flight.route.departureCity}-
                              {flight.route.arrivalCity}{" "}
                              <span>({flight.code})</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body style={{ alignContent: "initial" }}>
                      <div className="row">
                        <div className="col-md-5">
                          <center>
                            <h5>Timings</h5>
                          </center>
                          <span style={{ alignContent: "left" }}>
                            <strong>Departure date:</strong>{" "}
                            {flight.departureDate}
                            <br />
                            <strong>Departure Time: </strong>{" "}
                            {flight.departureTime}
                            <br />
                            <strong>Arrival date:</strong> {flight.arrivalDate}
                          </span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-4">
                          <center>
                            <h5>Prices</h5>
                          </center>
                          <span style={{ textAlign: "left" }}>
                            <strong>Economy Class :</strong>{" "}
                            {flight.economyClassPrice}/-
                            <br />
                            <strong>First Class: </strong>
                            {flight.firstClassPrice}/-
                            <br />
                            <strong>Business Class:</strong>{" "}
                            {flight.businessClassPrice}/-
                          </span>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <hr />
                        <span>
                          {" "}
                          <h6> Seats Avaliable :{flight.availableSeats}</h6>
                          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                          <Button
                            style={{ height: 40, width: 200 }}
                            onClick={() =>
                              navigate(`/bookticket/${customerId}/${flight.id}`)
                            }
                            variant="primary"
                          >
                            <p>Book Now</p>
                          </Button>
                        </span>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
          </div> */}
           <Container>
      <Row>
        <Col sm={12}>
         
        </Col>
      </Row>
      {bookings.map((booking) => (
        <Card key={booking.id} className="mb-3" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
          <Card.Header>
            <Row>
              <Col sm={6}>
                <h4>Booking ID: {booking.id}</h4>
              </Col>
              <Col sm={6} className="text-right">
                <p>Date: {booking.date}</p>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col sm={6}>
                <h5>Passenger Details</h5>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Account Holder Name:</td>
                      <td>{booking.customer.name}</td>
                    </tr>
                    <tr>
                      <td>Account Holder Email:</td>
                      <td>{booking.customer.email}</td>
                    </tr>
                    <tr>
                      <td>Passengername:</td>
                      <td>{booking.name}</td>
                    </tr>
                    <tr>
                      <td>seatno:</td>
                      <td>{booking.seat.seatNo}</td>
                    </tr>
                    <tr>
                      <td>Seat Class:</td>
                      <td>{booking.seat.seatclass}</td>
                    </tr>
                    
                  </tbody>
                </Table>
              </Col>
              <Col sm={6}>
                <h5>Flight Details</h5>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>Flight Code:</td>
                      <td>{booking.flight.code}</td>
                    </tr>
                    <tr>
                      <td>Airline:</td>
                      <td>{booking.flight.airline.name}</td>
                    </tr>
                    <tr>
                      <td>Departure:</td>
                      <td>
                        {booking.flight.route.departureCity} - {booking.flight.route.arrivalCity}
                      </td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{booking.flight.departureDate}</td>
                    </tr>
                    <tr>
                      <td>Time:</td>
                      <td>{booking.flight.departureTime}</td>
                    </tr>
                    
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-right">
            <p>Price: ₹{booking.price}</p>
          </Card.Footer>
        </Card>
      ))}
    </Container>
          {console.log(bookings)}
        </div>

        {}
      </div>
    );
}
export default PreviousBookings;