import { useEffect, useState } from "react";
import Navairline from "./navairline";
import { useParams } from "react-router";
import axios from "axios";
import { Accordion, Button } from "react-bootstrap";
import Updateflights from "./components/updateflight";
import Removeflight from "./components/removeflight";
import Passengerslist from "./components/seepassengers";

function Allflights(){
    const{aid}=useParams();
    const[flights,setFlights]=useState([ ]);


    useEffect(()=>{

        axios.get(`http://localhost:8081/flight/getbyairline/${aid}`)
        .then((response) => {setFlights(response.data)})
    },[ ])

    
    const [activeComponent, setActiveComponent] = useState(null);
    const [flightId, setFlightId] = useState(null);
    const [date, setDate] = useState(null);

    const handleButtonClick = (component, flightId, date) => {
      setActiveComponent(component);
      setFlightId(flightId);
      setDate(date);
      

    }





return(
    <div className="container  " >
        <Navairline/>
        <h1>All Flights</h1>
        <div className="col-md-3">

        </div>
        {console.log(flights)}
        <div className="col-md-12 m-50 ">
              {flights.map((flight) => (
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

                        <div>
                          <br/>
                          
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
      <br/>
                          <br/>

      {activeComponent === 'update' && <Updateflights flightId={flight.id} date={flight.departureDate} />}
{activeComponent === 'remove' && <Removeflight flightId={flight.id} date={flight.departureDate} />}
{activeComponent === 'seeBookings' && <Passengerslist flightId={flight.id} date={flight.departureDate} />}

    </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
              </div>
              <div className="col-md-3">

        </div>
    </div>
)
}
export default Allflights;