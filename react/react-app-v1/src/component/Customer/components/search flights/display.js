import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Form,
  InputGroup,
  Button,
  Container,
  Card,
  Row,
  Col,
  Accordion,
  Badge,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Nav,
} from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AutoComplete } from "antd";
function FlightSearch() {
  const { customerId } = useParams();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [flight1, setFlight1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState([]);
  const [JourneyType, setJourneyType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [seatClass, setSeatClass] = useState("");
  const [airlines, setAirlines] = useState([]);
  const [param] = useSearchParams();
  const navigate = useNavigate();
  const [selectedAirline, setSelectedAirline] = useState(null);
  const [temp, setTemp] = [...flights];

  //   useEffect(()=>{
  //     axios.get('http://localhost:8082/product/category/all/'+ param.get('cid'))
  //     .then(response=>setProducts(response.data))
  // })

  useEffect(() => {
    // axios
    //   .get("http://localhost:8081/route/getall")
    //   .then((response) => setRoute(response.data));

    axios
    .get("http://localhost:8081/route/getall")
    .then((response) => {
      const routes = response.data;
      console.log('Routes:', routes); // Log the routes to see the structure
      setRoute(routes);
    })
    .catch((error) => {
      console.error("Error fetching routes:", error);
    });

    axios
      .get("http://localhost:8081/flight/all")
      .then((response) => setFlight1(response.data));
  }, []);

  const resetFilters = () => {
    setFlights(temp);
  };

  const handleBookNowClick = (customerId, flightId) => {
    // Assuming you have a function to check if the user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      // User is logged in, navigate to the booking page
      navigate(`/bookticket/${customerId}/${flightId}`);
    } else {
      // User is not logged in, navigate to the login page
      navigate("/auth/login");
    }
  };

  // const searchFlights = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `http://localhost:8081/flight/getbysdd?source=${source}&destination=${destination}&date=${date}`
  //     );
  //     console.log('API response:', response);
  //     setFlights(response.data || []);
  //   } catch (error) {
  //     console.error('Error searching flights:', error);
  //   } finally {
  //     setLoading(false);
  //     axios.get('http://localhost:8081/airline/getall').then(response=>setAirlines(response.data))
  //   }
  // };
  const sortFlights = (direction) => {
    const sortedFlights = [...flights].sort((a, b) => {
      return direction === "ASC"
        ? a.businessClassPrice - b.businessClassPrice
        : b.businessClassPrice - a.businessClassPrice;
    });

    setFlights(sortedFlights);
  };
  const handleAirlineClick = (airlineId) => {
    // Set the selected airline
    setSelectedAirline(airlineId);

    // Trigger the search again with the selected airline
    searchFlights();
  };
  const searchFlights = async () => {
    try {
      setLoading(true);
      //http://localhost:8081/flight/getbysdd/filter?source=Chennai&destination=Mumbai&date=16-12-2023

      let apiUrl = `http://localhost:8081/flight/getbysdd/filter?source=${source}&destination=${destination}&date=${date}`;

      if (selectedAirline) {
        apiUrl += `&airlineId=${selectedAirline}`;
      }

      console.log("API URL:", apiUrl); // Log the constructed API URL

      const response = await axios.get(apiUrl);
      console.log("API response:", response);
      setFlights(response.data || []);
    } catch (error) {
      console.error("Error searching flights:", error);
    } finally {
      setLoading(false);
      axios.get("http://localhost:8081/airline/getall").then((response) => {
        console.log("Airlines response:", response); // Log the airlines response
        setAirlines(response.data);
      });
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // January is 0!
    let day = today.getDate();

    // Add leading zero if month or day is a single digit
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Container className="mt-4 mb-6">
        <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
          <Card.Body>
            <h3 className="mb-4"> Search Flights</h3>
            <Row>
              <Col>
                <Form>
                <Form.Group className="mb-3">
  <Form.Label htmlFor="source">Source:</Form.Label>
  <InputGroup>
    <AutoComplete
      options={route.map((route) => ({ value: route.departureCity }))}
      style={{ borderColor: "black", maxWidth: "800px", }}
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

                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="date">Date:</Form.Label>
                    <InputGroup>
                      <Form.Control
                        style={{ borderColor: "black", maxWidth: "800px" }}
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={getCurrentDate()}
                        className="w-75 mx-auto"
                      />
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Col>

              {/* <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="flightType">Journey Type:</Form.Label>
                  <InputGroup>
                    <Form.Select  style={{borderColor:'black'}}
                      id="flightType"
                      value={JourneyType}
                      onChange={(e) => setJourneyType(e.target.value)}
                    >
                      <option value="" disabled>Select type</option>
                      <option value="one-way">One-way</option>
                      <option value="round-trip">Round-trip</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="passengers">Passengers:</Form.Label>
                  <InputGroup>
                    <Form.Control
                    style={{borderColor:'black'}}
                      type="number"
                      id="passengers"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      min="1"
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="seatClass">Seat Class:</Form.Label>
                  <InputGroup>
                    <Form.Select  style={{borderColor:'black'}}
                      id="seatClass"
                      value={seatClass}
                      onChange={(e) => setSeatClass(e.target.value)}
                    >
                      <option value="" disabled>Select class</option>
                      <option value="ECONOMY">Economy</option>
                      <option value="BUSINESS">Business</option>
                      <option value="FIRST">First</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                
              </Form>
            </Col> */}
            </Row>
            <center>
              <Button onClick={searchFlights} disabled={loading}>
                Search Flights
              </Button>
            </center>
          </Card.Body>
        </Card>
      </Container>

      {flights && flights.length > 0 && (
        <div className="container mt-4 mb-6">
          <h3 className="mb-4">Search Results</h3>

          <div className="row mb-8">
            <div className="col-md-3 mb-6">
              <Card style={{ width: "18rem" }}>
                <Card.Header style={{ backgroundColor: "lightgrey" }}>
                  <h3>Filter by Airlines</h3>
                </Card.Header>
                <ListGroup>
                  {airlines.map((a, index) => (
                    <div key={a.id}>
                      <ListGroup.Item>
                        <Nav.Link onClick={() => handleAirlineClick(a.id)}>
                          {a.name}
                        </Nav.Link>
                      </ListGroup.Item>
                    </div>
                  ))}
                </ListGroup>
              </Card>
              <Card style={{ width: "18rem" }}>
                <Card.Header style={{ backgroundColor: "lightgrey" }}>
                  <h3>Filter by Price</h3>
                </Card.Header>
                <ListGroup>
                  <ListGroup.Item>
                    <Nav.Link onClick={() => sortFlights("ASC")}>
                      Min to Max
                    </Nav.Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Link onClick={() => sortFlights("DESC")}>
                      {" "}
                      Max to Min
                    </Nav.Link>
                  </ListGroup.Item>
                </ListGroup>
                {/* <center>
        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </center>  */}
              </Card>
            </div>

            <div className="col-md-9">
              {flights.map((flight) => (
                <Accordion
                  className="mt-4 mb-4"
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
                        <div>
                          {/* <h6>
                            Seats Avaliable:{" "}
                            <Badge bg="secondary">
                              <h6>{flight.availableSeats}</h6>
                            </Badge>
                          </h6> */}
                        </div>

                        <center>
                          {" "}
                          <Button
                            variant="primary"
                            style={{ height: 40, width: 200 }}
                            onClick={() =>
                              handleBookNowClick(customerId, flight.id)
                            }
                          >
                            {" "}
                            Book Now
                          </Button>
                        </center>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* <Container>
      <div className='col-md-3'> 

<Card
           style={{
             width: "18rem",
           }}
         >
           <CardHeader>airlines</CardHeader>
           <ListGroup >
           {airlines.map((a, index) => (
           <div key={index} >
              <ListGroupItem> 
                      <Nav.Link > {a.name}</Nav.Link>
             </ListGroupItem>
           </div>
         ))}
           </ListGroup>
         </Card>
 </div>  
  <div className='col-md-9'>
    {flights.map((flight) => (
       <Accordion   className="mt-4 mb-4" >
       <Accordion.Item style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }} >
         <Accordion.Header>
           <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>
                {flight.airline.name}
              </h3>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <span>
               <h5>
                 {flight.route.departureCity}   To  {flight.route.arrivalCity}  &nbsp; &nbsp; &nbsp; &nbsp;<br/> <h6>&nbsp;&nbsp;&nbsp;&nbsp;( {flight.code})</h6>
               </h5>
             </span>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <div>
             <h6>
        Seats Avaliable:  <Badge bg="secondary"><h6>{flight.availableSeats}</h6></Badge>
      </h6>   
             </div>
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <div> <Button variant="primary"> Book Now</Button></div>
           </div>
         </Accordion.Header>
         <Accordion.Body style={{alignContent:'initial'}}>
          <div className='row'>
          <div className='col-md-5'>
            <center><h5>Timings</h5></center>
         <span  style={{alignContent:"left"}}>
        <strong>Departure date:</strong>  {flight.departureDate}<br/>
        <strong>Departure Time: </strong>  {flight.departureTime}<br/>
        <strong>Arrival date:</strong>      {flight.arrivalDate}
         </span>&nbsp;&nbsp;&nbsp;&nbsp;
         </div>
         <div className='col-md-3'></div>
         <div className='col-md-4'>
         <center><h5>Prices</h5></center>
         <span  style={{textAlign:'left'}}>
         <strong>Economy Class :</strong>  {flight.economyClassPrice}/-<br/>
          <strong>First Class: </strong>{flight.firstClassPrice}/-<br/>
           <strong>Business Class:</strong> {flight.businessClassPrice}/-


         </span>&nbsp;&nbsp;&nbsp;&nbsp;
         </div>
         </div>
         </Accordion.Body>
       </Accordion.Item>
     </Accordion>
      ))}
</div>
</Container> */}

      {/* {
  <div>
    <h1>all flights</h1>
    {flight1.map((flight) => (
        <li key={flight.id}>
          {flight.route.departureCity} to {flight.route.arrivalCity} on {flight.departureDate}
        </li>
      ))}
    </div>
} */}

      {/* {flights.length > 0 ? (
        <ul className="flight-list">
          {flight1.map((flight) => (
            <li key={flight.id} className="flight-item">
              <div className="flight-details">
                <span className="flight-info">
                  <strong>{flight.route.departureCity}</strong> to{' '}
                  <strong>{flight.route.arrivalCity}</strong>
                </span>
                <span className="flight-info">
                  Departure: {flight.departureDate} at {flight.departureTime}
                </span>
                <span className="flight-info">
                  Arrival: {flight.arrivalDate} at {flight.arrivalTime}
                </span>
                <span className="flight-info">Flight Duration: {flight.route.duration} hours</span>
              </div>
              <div className="flight-price">
                <span className="price-label">Price:</span> ${flight.price}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flights found for the selected criteria.</p>
      )} */}

      {/* <ul className="list-group">
        {flights.map((flight) => (
          <li key={flight.id} className="list-group-item mb-3">
            <div className="d-flex justify-content-between">
              <div>
                <h5>{flight.route.arrivalCity} to {flight.route.arrivalCity}</h5>
                <p className="mb-1">Departure Date: {flight.departureDate}</p>
                <p className="mb-0">Airline: {flight.airline.name}</p>
              </div>
              <div>
                <p className="lead text-success">${flight.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul> */}

      <div className="container mt-4">
        <hr />
        <h3 className="mb-4">All Flights</h3>
        <div className="row">
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
                        {/* <h6> Seats Avaliable :{flight.availableSeats}</h6> */}
                        &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                        <Button
                          style={{ height: 40, width: 200 }}
                          onClick={() =>
                            handleBookNowClick(customerId, flight.id)
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
        </div>
      </div>
    </div>
  );
}

export default FlightSearch;
