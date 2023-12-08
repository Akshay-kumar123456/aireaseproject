import { Accordion, Button, Col, Container, Form, Row } from "react-bootstrap";
import Navairline from "./navairline";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Updateflights from "./components/updateflight";
import Removeflight from "./components/removeflight";
import Passengerslist from "./components/seepassengers";

function AirlineHome(){

  const{aid}=useParams();
  const[noflights,setNoflights]=useState('');
  const[nopassengers,setNopassengers]=useState('');
  const[income,setIncome]=useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const[flightt,setFlightt]=useState([ ]);

   useEffect(() => {
    

    axios.get(`http://localhost:8081/airline/statistics/flights/${aid}`)
    .then((response) => {setNoflights(response.data)})


      axios.get(`http://localhost:8081/airline/statistics/income/${aid}`)
      .then((response) => {setIncome(response.data)})


        axios.get(`http://localhost:8081/airline/statistics/passengers/${aid}`)
        .then((response) => {setNopassengers(response.data)})
  
       
        axios.get(`http://localhost:8081/flight/getbytoday/${aid}`)
        .then((response) => {setFlightt(response.data)})
      
  
  //   .catch((error) => {
  //     console.error("Error fetching routes:", error);
  //   });
      },[]);
      const [activeComponent, setActiveComponent] = useState(null);
    const [flightId, setFlightId] = useState(null);
    const [date, setDate] = useState(null);
      const handleButtonClick = (component, flightId, date) => {
        setActiveComponent(component);
        setFlightId(flightId);
        setDate(date);
        
  
      }
      const handleDateChange = (e) => {
        const selectedDateValue = e.target.value;
        setSelectedDate(selectedDateValue);
    
        axios.get(`http://localhost:8081/flight/getbyairline/${selectedDateValue}/${aid}`)
          .then((response) => { setFlightt(response.data) })
          .catch((error) => {
            console.error("Error fetching flights:", error);
          });
      };


  return (
    <div className="container">
      {console.log(aid)}
      <Navairline />
      <div>
        <h4>Welcome {localStorage.getItem("name")} Admin</h4>
      </div>
      <Container style={{marginTop:100}}>
      <Row className="justify-content-center">
        <Col md={3}>
          <div className="card" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
            
            <div className="card-body" style={{
        color: 'var(--BLACK, #060A32)',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '72px'
      }} >{noflights}</div>
      <div className="card-header"  style={{backgroundColor:'darkgrey'}} >
              <h3>Total Flights</h3>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="card" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
           
            <div className="card-body"   style={{
        color: 'var(--BLACK, #060A32)',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 700,
        
        lineHeight: '72px'
      }}>{income} /-</div>
       <div className="card-header "  style={{backgroundColor:'darkgrey'}}  >
              <h3>Total Income</h3>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="card " style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }} >
            
            <div className="card-body"style={{
        color: 'var(--BLACK, #060A32)',
        fontFamily: 'Inter',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '72px'
      }}>{nopassengers}</div>
      <div className="card-header "  style={{backgroundColor:'darkgrey'}} >
              <h3>Total Passengers</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    <br/>
    <br/>
    <br/>
    <br/>
    <Container className="col-md-10">
      <div className="rounded" style={{ display: 'flex', justifyContent: 'space-between', padding: 5, alignItems: 'center', backgroundColor: 'lightgrey' }}>
        <h2>&nbsp;&nbsp;&nbsp;Flights</h2>
        <Form.Control type="date" onChange={handleDateChange} style={{ width: '150px' }} />
      </div>
      
      <br />
      <br />
      <div className="col-md-12 m-50 ">
        {Array.isArray(flightt) && flightt.length > 0 ? (
          flightt.map((flight) => (
            <Accordion
              className="mt-4 mb-4 justify-content-center"
              defaultActiveKey="0"
              key={flight.id}
            >
              <Accordion.Item
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h3>{flight.airline.name}</h3>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>
                      <h5>
                        {flight.route.departureCity} To{" "}
                        {flight.route.arrivalCity} &nbsp; &nbsp; &nbsp;
                        &nbsp;
                        <br />{" "}
                        <h6>&nbsp;&nbsp;&nbsp;&nbsp;( {flight.code})</h6>
                      </h5>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                        <strong>Departure Time: </strong>
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
                        <strong>Economy Class :</strong>
                        {flight.economyClassPrice}/-
                        <br />
                        <strong>First Class: </strong>
                        {flight.firstClassPrice}/-
                        <br />
                        <strong>Business Class:</strong>
                        {flight.businessClassPrice}/-
                      </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <hr />
                    <div>
                      {/* <h6>
                        Seats Avaliable:{" }
                        <Badge bg="secondary">
                          <h6>{flight.availableSeats}</h6>
                        </Badge>
                      </h6> */}
                    </div>

                    <div>
                      <br />

                      <Button
                        variant="secondary"
                        style={{ height: 40, width: 200 }}
                        onClick={() => handleButtonClick('update')}
                      >
                        Update Flight
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        variant="danger"
                        style={{ height: 40, width: 200 }}
                        onClick={() => handleButtonClick('remove')}
                      >
                        Remove Flight
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        variant="info"
                        style={{ height: 40, width: 200 }}
                        onClick={() => handleButtonClick('seeBookings')}
                      >
                        See Bookings
                      </Button>
                      <br />
                      <br />

                      {activeComponent === 'update' && <Updateflights flightId={flight.id} date={flight.departureDate} />}
                      {activeComponent === 'remove' && <Removeflight flightId={flight.id} date={flight.departureDate} />}
                      {activeComponent === 'seeBookings' && <Passengerslist flightId={flight.id} date={flight.departureDate} />}

                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <h3>No flights available.</h3>
        )}
      </div>
     
    </Container>
    </div>
  );
}
export default AirlineHome;