import { useParams } from "react-router";
import NavbarcomponentWL from "./home/navbarf";
import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Col, Table } from "react-bootstrap";

function BookTicket() {
  const [data, seatData] = useState([]);
  const { flightId, customerId } = useParams();
  const [flight, setFlight] = useState({});
  const [seats, setSeats] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [seatNumber, setSeatNumber] = useState("");

  const isAddPassengerDisabled = () => {
    return !seatNumber || !isSeatAvailable(seatNumber);
  };

  const isSeatAvailable = (seatNumber) => {
    return (
      availableSeats.includes(seatNumber) && !selectedSeats.includes(seatNumber)
    );
  };

  const selectSeat = (seatNumber) => {
    if (isSeatAvailable(seatNumber)) {
      setSeatNumber(seatNumber);
    } else {
      alert("Please select a valid and available seat.");
    }
  };

  const addPassenger = () => {
    if (name && age && seatNumber && gender) {
      setSelectedSeats([...selectedSeats, seatNumber]);
      setPassengers([
        ...passengers,
        { name, age, gender, seatNumber: seatNumber },
      ]);
      setName("");
      setAge("");
      setGender("");
      setSeatNumber("");
    } else {
      alert(
        "Please enter valid passenger details and select an available seat."
      );
    }
  };

  const completeBooking = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8081/customerflight/bookticket/${customerId}/${flightId}`,
        passengers
      );

      seatData(response.data);
      console.log("Booking response:", response.data);
    } catch (error) {
      console.error("Error completing booking:", error);
    }
  };

  useEffect(() => {
    if (flightId) {
      axios
        .get(`http://localhost:8081/flight/getone/${flightId}`)
        .then((response) => {
          setFlight(response.data);
        });
      axios.get(`http://localhost:8081/getall/${flightId}`).then((response) => {
        setSeats(response.data);
      });
      axios
        .get(`http://localhost:8081/getavaliable/${flightId}`)
        .then((response) => {
          setAvailableSeats(response.data);
        });
    }
  }, [flightId],[ ]);

  // Add this line to conditionally render flight details
  if (!flight.id) return null;

  return (
    <div className="container">
      <NavbarcomponentWL />

      <div className="container">
        {console.log(flight)}
        <br />
        <br />
        <br />
      </div>
      <div className="row">
        <div className="col-md-8">
          <div key={flight.id} className="col-md-12 mb-4">
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
                      <span>
                        <h3>{flight.airline.name}</h3>
                      </span>
                      <span>
                        {flight.route.departureCity}-{flight.route.arrivalCity}{" "}
                        <span>({flight.code})</span>
                      </span>
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
                        <strong>Departure date:</strong> {flight.departureDate}
                        <br />
                        <strong>Departure Time: </strong> {flight.departureTime}
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
                    {/* <span> <h6> Seats Avaliable :{flight.availableSeats}</h6>&nbsp;&nbsp;&nbsp;&nbsp;style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
        <Button style={{ height: 40, width:200 }} onClick={() => navigate(`/bookticket/${customerId}/${flight.id}`)} variant="primary">
      <p>Book Now</p>
    </Button></span> */}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <div>
            <div
              className="border  p-3 rounded text-center"
              style={{
                maxWidth: "700px",
                margin: "auto",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <h5>Add Passengers Details:</h5>
              <hr />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addPassenger();
                }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-dark mx-auto"
                    id="name"
                    style={{ maxWidth: "400px" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="age" className="form-label">
                    Age:
                  </label>
                  <input
                    type="text"
                    className="form-control border border-dark mx-auto"
                    id="age"
                    style={{ maxWidth: "400px" }}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender:
                  </label>
                  <select
                    className="form-control border border-dark mx-auto"
                    id="gender"
                    style={{ maxWidth: "400px" }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isAddPassengerDisabled()}
                  className="btn btn-primary"
                >
                  Add Passenger
                </button>
              </form>
            </div>
            <div>
              {passengers && passengers.length > 0 && (
                <Col  md={10} style={{margin:70}}>
                  <h4>Passenger Details:</h4>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className="table-primary">
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Seat Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengers.map((passenger, index) => (
                        <tr className="table-light" key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{passenger.name}</td>
                          <td>{passenger.age}</td>
                          <td>{passenger.gender}</td>
                          <td>{passenger.seatNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              )}
            </div>

            {/* <div>
              <ul typeof="none">
                {passengers.map((passenger, index) => (
                  <li key={index}>
                    person{index +1}: Name: {passenger.name} <br /> Age: {passenger.age}
                    <br />
                    Gender: {passenger.gender}
                    <br/>
                   
                  </li>
                ))}
                <br/>
                <br/>
                
              </ul>
            </div> */}
          </div>
        </div>
        <div
          className="col-md-3 mb-9 border  p-3 rounded text-center  "
          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)" }}
        >
          <div>
            <br />
            <span>
              <button disabled className="btn btn-block btn-success">
                A
              </button>
              -FirstClass &nbsp;
              <button disabled className="btn btn-block btn-success">
                B
              </button>
              -BusinessClass &nbsp;
              <button disabled className="btn btn-block btn-success">
                C
              </button>{" "}
              -ExecutiveClass{" "}
            </span>
          </div>
          <br />
          <h6>Select SeatNumber</h6>
          <hr />
          <br />
          <div style={{ border: "3px black" }}>
            <div className="container">
              <div className="row">
                {seats.map((seat) => (
                  <div key={seat} className="col-4 mb-3">
                    <button
                      onClick={() => selectSeat(seat)}
                      disabled={!isSeatAvailable(seat)}
                      className={`btn btn-block ${
                        seat === selectedSeats
                          ? "btn-primary"
                          : isSeatAvailable(seat)
                          ? "btn-success"
                          : "btn-danger"
                      }`}
                    >
                      {seat}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <button
              type="submit"
              onClick={completeBooking}
              className="btn btn-primary mb-10"
            >
              Complete Booking
            </button>
          </div>
        </div>
      </div>
      <br />
      <br />
      <button type="submit" className="btn btn-primary mb-10">
        Pay now {data.totalPrice}/-
      </button>
      <br />
      <br />
      <br />
    </div>
  );
}

export default BookTicket;
