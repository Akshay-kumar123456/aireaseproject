import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, InputGroup, Button, Container, Card, Row, Col, Accordion, Badge } from 'react-bootstrap';
function FlightSearch() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [flight1, setFlight1] = useState([]);
  const [loading, setLoading] = useState(false);
  const[route,setRoute]=useState([])
  const[JourneyType,setJourneyType]=useState('')
  const[passengers,setPassengers]=useState('')
  const[seatClass,setSeatClass]=useState('')

//   useEffect(()=>{
//     axios.get('http://localhost:8082/product/category/all/'+ param.get('cid'))
//     .then(response=>setProducts(response.data))
// })



useEffect(()=>{
   
  axios.get('http://localhost:8081/route/getall').then(response=>setRoute(response.data))

  axios.get('http://localhost:8081/flight/all').then(response=>setFlight1(response.data))


},[ ])
     



  const searchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8081/flight/getbysdd?source=${source}&destination=${destination}&date=${date}`
      );
      console.log('API response:', response);
      setFlights(response.data || []); 
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Container className="mt-4 mb-4" >
      <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)' }}>
        <Card.Body>
          <h3 className="mb-4"> Search Flights</h3>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="source">Source:</Form.Label>
                  <InputGroup>
                    <Form.Select  style={{borderColor:'black'}}
                      id="source"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    >
                      <option value="" disabled>Select source</option>
                      {route.map(route => (
                        <option key={route.id} value={route.departureCity}>{route.departureCity}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="destination">Destination:</Form.Label>
                  <InputGroup>
                    <Form.Select  style={{borderColor:'black'}}
                      id="destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="" disabled>Select destination</option>
                      {route.map(route => (
                        <option key={route.id} value={route.arrivalCity}>{route.arrivalCity}</option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="date">Date:</Form.Label>
                  <InputGroup>
                    <Form.Control  style={{borderColor:'black'}}
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-75"
                    />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>

            <Col>
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
            </Col>
          </Row>
          <center><Button onClick={searchFlights} disabled={loading}>
                  Search Flights
                </Button></center>
        </Card.Body>
        
      </Card>
    </Container>



    
    <Container>
  <div className='col-md-8'>
    {flights.map((flight) => (
       <Accordion   className="mt-4 mb-4">
       <Accordion.Item >
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
</Container>

{/* <Accordion.Item eventKey="0">
            <Accordion.Header>
            <div className="d-flex justify-content-between align-items-center">
      <div>
        {flight.route.departureCity} to {flight.route.arrivalCity}
      </div>
      <div>
      <h5> <span className="badge bg-info">Flight Code: {flight.code}</span></h5> 
        <span className="badge bg-success">Avaliable Seats: {flight.availableSeats}</span>
        <span className="badge bg-secondary">Duration: {flight.duration}h</span>
      </div>
    </div>
            </Accordion.Header>
            <Accordion.Body>
            <div className="d-flex justify-content-between">
      <div>
        <p>Departure: {flight.departureDate}</p>
        <p>Departure Time: {flight.departureTime}</p>
        <p>Arrival: {flight.arrivalDate}</p>
      </div>
      <div>
        <p>Economy: ${flight.economyClassPrice}</p>
        <p>First Class: ${flight.firstClassPrice}</p>
        <p>Business: ${flight.businessClassPrice}</p>
      </div>
    </div>
    <p>Distance: {flight.distance} km</p>
            </Accordion.Body>
          </Accordion.Item> */}
    {/* {flights.map((flight) => (
          <div key={flight.id} className="col-md-9 mb-4">
    <Accordion.Item eventKey="0">
  <Accordion.Header>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        {flight.departureCity} to {flight.arrivalCity}
      </div>
      <div>
        <span className="badge bg-info">Flight Code: {flight.code}</span>
        <span className="badge bg-success">Seats: {flight.availableSeats}</span>
        <span className="badge bg-secondary">Duration: {flight.duration}h</span>
      </div>
    </div>
  </Accordion.Header>
  <Accordion.Body>
    <div className="d-flex justify-content-between">
      <div>
        <p>Departure: {flight.departureDate}</p>
        <p>Departure Time: {flight.departureTime}</p>
        <p>Arrival: {flight.arrivalDate}</p>
      </div>
      <div>
        <p>Economy: ${flight.economyClassPrice}</p>
        <p>First Class: ${flight.firstClassPrice}</p>
        <p>Business: ${flight.businessClassPrice}</p>
      </div>
    </div>
    <p>Distance: {flight.distance} km</p>
  </Accordion.Body>
</Accordion.Item>
</div>
))} */}
{/*      
      {flights && flights.length > 0 && (
  <div>
<div className="container mt-4">
      <h3 className="mb-4">Search Results</h3>
     

     
          
      <div className="row">
       
        {flights.map((flight) => (
          <div key={flight.id} className="col-md-9 mb-4">
            
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  {flight.route.departureCity} to {flight.route.arrivalCity}
                </h5>
                <p className="card-text">Departure Date: {flight.departureDate}</p>
                <p className="card-text">Airline: {flight.airline.name}</p>
                <p className="card-text">Price: ${flight.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)} */}
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
      <hr/>
<div className="container mt-4">
      <h3 className="mb-4">All Flights</h3>
      <div className="row">
        {flight1.map((flight) => (
          <div key={flight.id} className="col-md-6 mb-4">
            <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)' }}>
              <div className="card-body">
                <h5 className="card-title">
                  {flight.route.departureCity} to {flight.route.arrivalCity}
                </h5>
                <p className="card-text">Departure Date: {flight.departureDate}</p>
                <p className="card-text">Airline: {flight.airline.name}</p>
                <p className="card-text">Price: ${flight.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
}

export default FlightSearch;
************************************************************
// import { useParams } from "react-router";
// import NavbarcomponentWL from "./home/navbarf";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function BookTicket(){
//     const { flightId, customerId } = useParams();
//     const[flight,setFlight]=useState( ' ');
//     const[seats,setSeats]=useState([ ] );
//     const[avaliableseats,setAvaliableseats]=useState([ ] );
//     const [passengers, setPassengers] = useState([]);
//     const [selectedSeats, setSelectedSeats] = useState([]);
//     const[person,setPerson]=useState(
//         {
//             name: '',
//             age : '',
//             gender: '',
//             seatNo:' '
//         }
//     );

//     const addPassenger = () => {
//            if (person.name && person.age && person.seatNo && person.gender) {
//              setPassengers([...passengers, person]);
//                setSelectedSeats([...selectedSeats, person.seatNo]);
//                setPerson({ name: '', age: '', gender:'',seatNo: '' });
//              } else {
//           alert('Please enter valid passenger details and select an available seat.');
//             }
//           };

//           const isSeatAvailable = (seatNo) => {
//                return avaliableseats.includes(seatNo) && !selectedSeats.includes(seatNo);
//            };

//            const selectSeat = (seatNo) => {
//             if (isSeatAvailable(seatNo)) {
//               // Assuming formData and setFormData are part of your component's state
//               setPerson({ ...person, seatNo });
//             } else {
//               alert('Please select a valid and available seat.');
//             }
//           };


//           const completeBooking = async () => {
//             try {
//               // Assuming you have booking data in your formData state
//               const response = await axios.post('http://example.com/api/bookings', passengers);
          
//               // Handle the server response as needed
//               console.log('Booking response:', response.data);
          
//               // Perform any additional client-side actions
          
//               alert('Booking completed!');
//             } catch (error) {
//               // Handle errors, e.g., display an error message
//               console.error('Error completing booking:', error);
//               alert('Error completing booking. Please try again.');
//             }
//           };
          

//     useEffect(() => {
//         // Check if fid is defined before making the API call
//         if (flightId) {
//             console.log(flightId)
//           axios.get(`http://localhost:8081/flight/getone/${flightId}`).then(response => setFlight(response.data));

//           axios.get( `http://localhost:8081/getall/${flightId}`).then(response => setSeats(response.data));

//           axios.get( `http://localhost:8081/getavaliable/${flightId}`).then(response => setAvaliableseats(response.data)); 
//         }
//       }, [flightId]);


//       return (
//         <div>
//           <NavbarcomponentWL />
      
          
      
//           <div>
//             {seats.map((seat) => (
//               <button
//                 key={seat}
//                 disabled={!avaliableseats.includes(seat)}
//                 style={{
//                   backgroundColor: avaliableseats.includes(seat) ? 'green' : 'red',
//                   margin: '5px',
//                   cursor: avaliableseats.includes(seat) ? 'pointer' : 'not-allowed',
//                 }}
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         </div>
//       );
      
// }
// export default BookTicket;


// import { useParams } from "react-router";
// import NavbarcomponentWL from "./home/navbarf";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function BookTicket() {
//   const { flightId, customerId } = useParams();
//   const [flight, setFlight] = useState('');
//   const [seats, setSeats] = useState([]);
//   const [avaliableseats, setAvaliableseats] = useState([]);
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [person, setPerson] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     seatNo: ''
//   });
  // const [name,setName]=useState(' ');
  // const [age,setAge]=useState(' ');
  // const [Gender,setGender]=useState(' ');
  // const [seatNo,setSeatNo]=useState(' ')


  // const addPassenger = () => {
  //   if (person.name && person.age && person.seatNo && person.gender) {
  //     setPerson({ name: '', age: '', gender: '', seatNo: '' });
  //     setSelectedSeats([...selectedSeats, person.seatNo]);
  //     setPassengers([...passengers, person]);
      
      
  //   } else {
  //     alert('Please enter valid passenger details and select an available seat.');
  //   }
  // };
//   const addPassenger = () => {
//     if (person.name && person.age && person.seatNo && person.gender && person.seatNo) {
//       // Update local state
//       setPerson({ name: '', age: '', gender: '', seatNo: '' });
//       setSelectedSeats([...selectedSeats, person.seatNo]);
//       setPassengers([...passengers, person]);
//     } else {
//       alert('Please enter valid passenger details and select an available seat.');
//     }
//   };


//   const isSeatAvailable = (seatNo) => {
//     return avaliableseats.includes(seatNo) && !selectedSeats.includes(seatNo);
//   };

//   const selectSeat = (seatNo) => {
//     if (isSeatAvailable(seatNo)) {
//       setPerson({ ...person, seatNo });
//     } else {
//       alert('Please select a valid and available seat.');
//     }
//   };

//   const completeBooking = async () => {
//     try {
//       console.log(passengers)
//       const response = await axios.post(`http://localhost:8081/customerflight/bookticket/${customerId}/${flightId}`, passengers);

//       console.log('Booking response:', response.data);

//       alert('Booking completed!');
//     } catch (error) {
//       console.error('Error completing booking:', error);
//       alert('Error completing booking. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (flightId) {
//       axios.get(`http://localhost:8081/flight/getone/${flightId}`).then(response => setFlight(response.data));

//       axios.get(`http://localhost:8081/getall/${flightId}`).then(response => setSeats(response.data));

//       axios.get(`http://localhost:8081/getavaliable/${flightId}`).then(response => setAvaliableseats(response.data));
//     }
//   }, []);

//   return (
//     <div>
//       <NavbarcomponentWL />

//       <div>
        

//         {/* <div>
//           {seats.map((seat) => (
//             <button
//               key={seat}
//               disabled={!avaliableseats.includes(seat)}
//               style={{
//                 backgroundColor: avaliableseats.includes(seat) ? 'green' : 'red',
//                 margin: '5px',
//                 cursor: avaliableseats.includes(seat) ? 'pointer' : 'not-allowed',
//               }}
//               onClick={() => selectSeat(seat)}
//             >
//               {seat}
//             </button>
//           ))}
//         </div> */}

//         <div>
//           <h3>Selected Seats:</h3>
//           <p>{selectedSeats.join(', ')}</p>
//         </div>

//         <div>
//           <h3>Passenger Details:</h3>
//           <ul>
//             {passengers.map((passenger, index) => (
//               <li key={index}>
//                 {passenger.name}, {passenger.age}, {passenger.gender}, Seat: {passenger.seatNo}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//       <h3>Seats:</h3>
//          <div>
//            {seats.map((seat) => (
//              <button
//                key={seat}
//                value={seat}
//                onClick={() => selectSeat(seat) }
//                disabled={!isSeatAvailable(seat)}
//                style={{
//                  backgroundColor: isSeatAvailable(seat) ? 'green' : 'red',
//                  margin: '5px',
//                }}
//              >
//                {seat}
//              </button>
//            ))}
//          </div>
//        </div>

//         <div>
//           <h3>Add Passenger:</h3>
//           <form>
//             <label>Name:</label>
//             <input type="text" value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} />

//             <label>Age:</label>
//             <input type="text" value={person.age} onChange={(e) => setPerson({ ...person, age: e.target.value })} />

//             <label>Gender:</label>
//             <input type="text" value={person.gender} onChange={(e) => setPerson({ ...person, gender: e.target.value })} />

//             <button type="button" onClick={addPassenger}>
//               Add Passenger
//             </button>
//           </form>


//         </div>

//         <div>
          
//           <button type="button" onClick={completeBooking}>
//             Complete Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookTicket;


// import { useParams } from "react-router";
// import NavbarcomponentWL from "./home/navbarf";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function BookTicket() {
//   const { flightId, customerId } = useParams();
//   const [flight, setFlight] = useState('');
//   const [seats, setSeats] = useState([]);
//   const [avaliableseats, setAvaliableseats] = useState([]);
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('');
//   const [seatNo, setSeatNo] = useState('');
//   const [person,setPerson]=useState({

//     "name":name,
//     "age":age,
//     "gender":gender,
//     "seatNo":seatNo
//    });

  // const addPassenger = () => {
  //   if (name && age && seatNo && gender) {

  //     console.log(name+age+seatNo+gender)
  //     // Update local state
  //     setSelectedSeats([...selectedSeats, seatNo]);
  //     setPassengers([...passengers, { name, age, gender, seatNo }]);
  //     console.log(passengers)
  //     setName('');
  //     setAge('');
  //     setGender('');
  //     setSeatNo('');
  //   } else {
  //     alert('Please enter valid passenger details and select an available seat.');
  //   }
  // };

  // const selectSeat = (seatNo) => {
  //   if (isSeatAvailable(seatNo)) {
  //     setSeatNo(seatNo);
  //   } else {
  //     alert('Please select a valid and available seat.');
  //   }
  // };
  
  // const addPassenger = () => {
  //   if (name && age && seatNo && gender) {
  //     // Use functional form of setSeatNo to ensure latest state
  //     setSeatNo((prevSeatNo) => {
  //       setSelectedSeats([...selectedSeats, prevSeatNo]);
  //       setPassengers([...passengers, person]);
  //       return '';
  //     });
  //     setName('');
  //     setAge('');
  //     setGender('');
  //   } else {
  //     alert('Please enter valid passenger details and select an available seat.');
  //   }
  // };
  
   

  // const isSeatAvailable = (seatNo) => {
  //   return avaliableseats.includes(seatNo) && !selectedSeats.includes(seatNo);
  // };

  // const selectSeat = (seatNo) => {
  //   if (isSeatAvailable(seatNo)) {
  //     setSeatNo(seatNo);
  //   } else {
  //     alert('Please select a valid and available seat.');
  //   }
  // };

//   const completeBooking = async () => {
//     try {
//       console.log(passengers);
//       const response = await axios.post(`http://localhost:8081/customerflight/bookticket/${customerId}/${flightId}`, passengers);

//       console.log('Booking response:', response.data);

//       alert('Booking completed!');
//     } catch (error) {
//       console.error('Error completing booking:', error);
//       alert('Error completing booking. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (flightId) {
//       axios.get(`http://localhost:8081/flight/getone/${flightId}`).then(response => setFlight(response.data));
//       axios.get(`http://localhost:8081/getall/${flightId}`).then(response => setSeats(response.data));
//       axios.get(`http://localhost:8081/getavaliable/${flightId}`).then(response => setAvaliableseats(response.data));
//     }
//   }, []);

//   return (
//     <div>
//       <NavbarcomponentWL />

//       <div>
//         <div>
//           <h3>Selected Seats:</h3>
//           <p>{selectedSeats.join(', ')}</p>
//         </div>

//         <div>
//           <h3>Passenger Details:</h3>
//           <ul>
//             {passengers.map((passenger, index) => (
//               <li key={index}>
//                 {passenger.name}, {passenger.age}, {passenger.gender}, Seat: {passenger.seatNo}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3>Seats:</h3>
//           <div>
//             {seats.map((seat) => (
//               <button
//                 key={seat}
//                 onClick={() => selectSeat(seat)}
//                 disabled={!isSeatAvailable(seat)}
//                 style={{
//                   backgroundColor: isSeatAvailable(seat) ? 'green' : 'red',
//                   margin: '5px',
//                 }}
//               >
//                 {seat}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <h3>Add Passenger:</h3>
//           <form>
//             <label>Name:</label>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

//             <label>Age:</label>
//             <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

//             <label>Gender:</label>
//             <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />

//             <button type="button" onClick={addPassenger}>
//               Add Passenger
//             </button>
//           </form>
//         </div>

//         <div>
//           <button type="button" onClick={completeBooking}>
//             Complete Booking
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookTicket;

// import { useParams } from "react-router";
// import NavbarcomponentWL from "./home/navbarf";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function BookTicket() {
//   const { flightId, customerId } = useParams();
//   const [flight, setFlight] = useState('');
//   const [seats, setSeats] = useState([]);
//   const [avaliableseats, setAvaliableseats] = useState([]);
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [person, setPerson] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     seatNumber: ''
//   });
//   const [buttonClicked, setButtonClicked] = useState(false);

//   const selectSeat = (seatNumber) => {
//     if (isSeatAvailable(seatNumber)) {
//       setPerson({ ...person, seatNumber });
//       setButtonClicked(true);
//     } else {
//       alert('Please select a valid and available seat.');
//     }
//   };

//   const addPassenger = () => {
//     if (person.name && person.age && person.seatNumber && person.gender) {
//       // Update local state
//       setSelectedSeats([...selectedSeats, person.seatNumber]);
//       setPassengers([...passengers, person]);
//       // Reset person state
//       setPerson({ name: '', age: '', gender: '', seatNumber: '' });
//     } else {
//       alert('Please enter valid passenger details and select an available seat.');
//     }
//   };

//   const isSeatAvailable = (seatNumber) => {
//     return avaliableseats.includes(seatNumber) && !selectedSeats.includes(seatNumber);
//   };

//   const completeBooking = async () => {
//     try {
//       console.log(passengers);
//       const response = await axios.post(`http://localhost:8081/customerflight/bookticket/${customerId}/${flightId}`, passengers);

//       console.log('Booking response:', response.data);

//       alert('Booking completed!');
//     } catch (error) {
//       console.error('Error completing booking:', error);
//       alert('Error completing booking. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (flightId) {
//       axios.get(`http://localhost:8081/flight/getone/${flightId}`).then(response => setFlight(response.data));
//       axios.get(`http://localhost:8081/getall/${flightId}`).then(response => setSeats(response.data));
//       axios.get(`http://localhost:8081/getavaliable/${flightId}`).then(response => setAvaliableseats(response.data));
//     }
//   }, []);

//   return (
//     <div>
//         <NavbarcomponentWL />

//         <div>
//         <div className="row">
//         {flight1.map((flight) => (
//           <div key={flight.id} className="col-md-6 mb-4">
//             <Accordion className="mt-4 mb-4" defaultActiveKey="0" key={flight.id}>
//             <Accordion.Item style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//               <Accordion.Header>
//               <div className="d-flex justify-content-between">
//   <div className='col-md-10'>
//     <div>
//       <h3>{flight.airline.name}</h3>
//     </div>
//     <div>
//       <p>
//         {flight.route.departureCity}-{flight.route.arrivalCity} <span>({flight.code})</span>
//       </p>
//     </div>
//   </div>
  
// </div>


//               </Accordion.Header>
//               <Accordion.Body style={{ alignContent: 'initial' }}>
//               <div className='row'>
//           <div className='col-md-5'>
//             <center><h5>Timings</h5></center>
//          <span  style={{alignContent:"left"}}>
//         <strong>Departure date:</strong>  {flight.departureDate}<br/>
//         <strong>Departure Time: </strong>  {flight.departureTime}<br/>
//         <strong>Arrival date:</strong>      {flight.arrivalDate}
//          </span>&nbsp;&nbsp;&nbsp;&nbsp;


//          </div>
//          <div className='col-md-3'></div>
//          <div className='col-md-4'>
//          <center><h5>Prices</h5></center>
//          <span  style={{textAlign:'left'}}>
//          <strong>Economy Class :</strong>  {flight.economyClassPrice}/-<br/>
//           <strong>First Class: </strong>{flight.firstClassPrice}/-<br/>
//            <strong>Business Class:</strong> {flight.businessClassPrice}/-


//          </span>&nbsp;&nbsp;&nbsp;&nbsp;
       
//          </div>
//          <hr/>
//        <span> <h6> Seats Avaliable :{flight.availableSeats}</h6>&nbsp;&nbsp;&nbsp;&nbsp; <Button style={{ height: 40, width:200 }} onClick={() => navigate(`/bookticket/${customerId}/${flight.id}`)} variant="primary">
//       <p>Book Now</p>
//     </Button></span>
//          </div>
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//           </div>
//         ))}
//       </div>
//     </div>
//         </div>


//  </div>
    

    




//       <div>
//         <div>
//           <h3>Selected Seats:</h3>
//           <p>{selectedSeats.join(', ')}</p>
//         </div>

//         <div>
//           <h3>Passenger Details:</h3>
//           <ul>
//             {passengers.map((passenger, index) => (
//               <li key={index}>
//                 {passenger.name}, {passenger.age}, {passenger.gender}, Seat: {passenger.seatNo}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div>
//           <h3>Seats:</h3>
//           <div>
//             {seats.map((seat) => (
//               <button
//               key={seat}
//               onClick={() => selectSeat(seat)}
//               disabled={!isSeatAvailable(seat)}
//               style={{
//                 backgroundColor: seat === selectedSeats ? 'blue' : isSeatAvailable(seat) ? 'green' : 'red',
//                 margin: '5px',
//               }}
//             >
//               {seat}
//             </button>
//             ))}
//           </div>
//         </div>

{/* <div>
  <h3>Seats:</h3>
  <div className="container">
    <div className="row">
      {seats.map((seat) => (
        <div key={seat} className="col-4 mb-3">
          <button
            onClick={() => selectSeat(seat)}
            disabled={!isSeatAvailable(seat)}
            className={`btn btn-block ${seat === selectedSeats ? 'btn-primary' : isSeatAvailable(seat) ? 'btn-success' : 'btn-danger'}`}
          >
            {seat}
          </button>
        </div>
      ))}
    </div>
  </div>
</div> */}

{/* 
        <div>
          <h3>Add Passenger:</h3>
          <form>
            <label>Name:</label>
            <input type="text" value={person.name} onChange={(e) => setPerson({ ...person, name: e.target.value })} />

            <label>Age:</label>
            <input type="text" value={person.age} onChange={(e) => setPerson({ ...person, age: e.target.value })} />

            <label>Gender:</label>
            <input type="text" value={person.gender} onChange={(e) => setPerson({ ...person, gender: e.target.value })} />

            <button type="button" onClick={addPassenger}>
              Add Passenger
            </button>
          </form>
        </div>

        <div>
          <button type="button" onClick={completeBooking}>
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookTicket; */}