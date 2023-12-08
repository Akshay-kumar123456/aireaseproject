// import React, { useState } from 'react';

// const TicketBookingPage = () => {
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     seatNumber: '',
//   });

//   const addPassenger = () => {
//     if (formData.fullName && formData.email) {
//       setPassengers([...passengers, formData]);
//       setFormData({ fullName: '', email: '', seatNumber: '' });
//     } else {
//       alert('Please enter valid passenger details.');
//     }
//   };

//   const selectSeat = (seatNumber) => {
//     if (!selectedSeats.includes(seatNumber)) {
//       setSelectedSeats([...selectedSeats, seatNumber]);
//       setFormData({ ...formData, seatNumber: '' });
//     } else {
//       alert('This seat is already selected.');
//     }
//   };

//   const completeBooking = () => {
//     // Perform additional actions to complete the booking, e.g., send data to server
//     alert('Booking completed!');
//   };

//   return (
//     <div>
//       <h1>Flight Reservation</h1>

//       <form>
//         <label htmlFor="fullName">Full Name:</label>
//         <input
//           type="text"
//           id="fullName"
//           value={formData.fullName}
//           onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />

//         <button type="button" onClick={addPassenger}>
//           Add Passenger
//         </button>
//       </form>

//       <div>
//         <h3>Passengers:</h3>
//         {passengers.map((passenger, index) => (
//           <p key={index}>
//             {index + 1}. {passenger.fullName} - {passenger.email}
//           </p>
//         ))}
//       </div>

//       <div>
//         <h3>Available Seats:</h3>
//         <div>
//           {[...'ABC'].map((row) => (
//             <div key={row}>
//               {[...Array(4).keys()].map((num) => {
//                 const seatNumber = `${num + 1}${row}`;
//                 return (
//                   <button
//                     key={seatNumber}
//                     onClick={() => selectSeat(seatNumber)}
//                     disabled={selectedSeats.includes(seatNumber)}
//                   >
//                     {seatNumber}
//                   </button>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3>Selected Seats:</h3>
//         {selectedSeats.map((seat, index) => (
//           <p key={index}>{index + 1}. {seat}</p>
//         ))}
//       </div>

//       <button onClick={completeBooking}>Complete Booking</button>
//     </div>
//   );
// };

// export default TicketBookingPage;


// import React, { useState } from 'react';

// const TicketBookingPage = () => {
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     seatNumber: '',
//   });

//   const availableSeats = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B']; // Add more seats as needed

//   const addPassenger = () => {
//     if (formData.fullName && formData.email) {
//       setPassengers([...passengers, formData]);
//       setFormData({ fullName: '', email: '', seatNumber: '' });
//     } else {
//       alert('Please enter valid passenger details.');
//     }
//   };

//   const selectSeat = (seatNumber) => {
//     if (availableSeats.includes(seatNumber) && !selectedSeats.includes(seatNumber)) {
//       setSelectedSeats([...selectedSeats, seatNumber]);
//       setFormData({ ...formData, seatNumber: '' });
//     } else {
//       alert('Please select a valid and available seat.');
//     }
//   };

//   const completeBooking = () => {
//     // Perform additional actions to complete the booking, e.g., send data to server
//     alert('Booking completed!');
//   };

//   return (
//     <div>
//       <h1>Flight Reservation</h1>

//       <form>
//         <label htmlFor="fullName">Full Name:</label>
//         <input
//           type="text"
//           id="fullName"
//           value={formData.fullName}
//           onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />

//         <button type="button" onClick={addPassenger}>
//           Add Passenger
//         </button>
//       </form>

//       <div>
//         <h3>Passengers:</h3>
//         {passengers.map((passenger, index) => (
//           <p key={index}>
//             {index + 1}. {passenger.fullName} - {passenger.email}
//           </p>
//         ))}
//       </div>

//       <div>
//         <h3>Available Seats:</h3>
//         <div>
//           {availableSeats.map((seat) => (
//             <button
//               key={seat}
//               onClick={() => selectSeat(seat)}
//               disabled={selectedSeats.includes(seat)}
//             >
//               {seat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3>Selected Seats:</h3>
//         {selectedSeats.map((seat, index) => (
//           <p key={index}>{index + 1}. {seat}</p>
//         ))}
//       </div>

//       <button onClick={completeBooking}>Complete Booking</button>
//     </div>
//   );
// };

// export default TicketBookingPage;


// import React, { useState } from 'react';

// const TicketBookingPage = () => {
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     seatNumber: '',
//   });

//   const availableSeats = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B']; // Add more seats as needed

//   const addPassenger = () => {
//     if (formData.fullName && formData.email) {
//       setPassengers([...passengers, formData]);
//       setFormData({ fullName: '', email: '', seatNumber: '' });
//     } else {
//       alert('Please enter valid passenger details.');
//     }
//   };

//   const isSeatAvailable = (seatNumber) => {
//     return !selectedSeats.includes(seatNumber) && availableSeats.includes(seatNumber);
//   };

//   const selectSeat = (seatNumber) => {
//     if (isSeatAvailable(seatNumber)) {
//       setSelectedSeats([...selectedSeats, seatNumber]);
//       setFormData({ ...formData, seatNumber: '' });
//     } else {
//       alert('Please select a valid seat.');
//     }
//   };

//   const completeBooking = () => {
//     // Perform additional actions to complete the booking, e.g., send data to server
//     alert('Booking completed!');
//   };

//   return (
//     <div>
//       <h1>Flight Reservation</h1>

//       <form>
//         <label htmlFor="fullName">Full Name:</label>
//         <input
//           type="text"
//           id="fullName"
//           value={formData.fullName}
//           onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />

//         <button type="button" onClick={addPassenger}>
//           Add Passenger
//         </button>
//       </form>

//       <div>
//         <h3>Passengers:</h3>
//         {passengers.map((passenger, index) => (
//           <p key={index}>
//             {index + 1}. {passenger.fullName} - {passenger.email}
//           </p>
//         ))}
//       </div>

//       <div>
//         <h3>Seats:</h3>
//         <div>
//           {availableSeats.map((seat) => (
//             <button
//               key={seat}
//               onClick={() => selectSeat(seat)}
//               disabled={!isSeatAvailable(seat)}
//               style={{
//                 backgroundColor: isSeatAvailable(seat) ? 'green' : 'red',
//                 margin: '5px',
//               }}
//             >
//               {seat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3>Selected Seats:</h3>
//         {selectedSeats.map((seat, index) => (
//           <p key={index}>{index + 1}. {seat}</p>
//         ))}
//       </div>

//       <button onClick={completeBooking}>Complete Booking</button>
//     </div>
//   );
// };

// export default TicketBookingPage;

// import React, { useState } from 'react';

// const TicketBookingPage = () => {
//   const [passengers, setPassengers] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     seatNumber: '',
//   });

//   const allSeats = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B']; // Add more seats as needed
//   const availableSeats = ['1A', '1B', '2A', '2B']; // Your list of available seats

//   const addPassenger = () => {
//     if (formData.fullName && formData.email && formData.seatNumber) {
//       setPassengers([...passengers, formData]);
//       setSelectedSeats([...selectedSeats, formData.seatNumber]);
//       setFormData({ fullName: '', email: '', seatNumber: '' });
//     } else {
//       alert('Please enter valid passenger details and select an available seat.');
//     }
//   };

//   const isSeatAvailable = (seatNumber) => {
//     return availableSeats.includes(seatNumber) && !selectedSeats.includes(seatNumber);
//   };

//   const selectSeat = (seatNumber) => {
//     if (isSeatAvailable(seatNumber)) {
//       setFormData({ ...formData, seatNumber });
//     } else {
//       alert('Please select a valid and available seat.');
//     }
//   };

//   const completeBooking = () => {
//     // Perform additional actions to complete the booking, e.g., send data to server
//     alert('Booking completed!');
//   };

//   return (
//     <div>
//       <h1>Flight Reservation</h1>

//       <form>
//         <label htmlFor="fullName">Full Name:</label>
//         <input
//           type="text"
//           id="fullName"
//           value={formData.fullName}
//           onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//           required
//         />

//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           required
//         />
//       </form>

//       <div>
//         <h3>Seats:</h3>
//         <div>
//           {allSeats.map((seat) => (
//             <button
//               key={seat}
//               onClick={() => selectSeat(seat)}
//               disabled={!isSeatAvailable(seat)}
//               style={{
//                 backgroundColor: isSeatAvailable(seat) ? 'green' : 'red',
//                 margin: '5px',
//               }}
//             >
//               {seat}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h3>Selected Seat:</h3>
//         <p>{formData.seatNumber}</p>
//       </div>

//       <button type="button" onClick={addPassenger}>
//         Add Passenger
//       </button>

//       <div>
//         <h3>Passengers:</h3>
//         {passengers.map((passenger, index) => (
//           <p key={index}>
//             {index + 1}. {passenger.fullName} - {passenger.email} - {passenger.seatNumber}
//           </p>
//         ))}
//       </div>

//       <button onClick={completeBooking}>Complete Booking</button>
//     </div>
//   );
// };

// export default TicketBookingPage;

import React, { useState } from 'react';

const TicketBookingPage = () => {
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    seatNumber: '',
  });
  const [allSeats] = useState(['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B']);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const addPassenger = () => {
    if (formData.fullName && formData.email && formData.seatNumber) {
      setPassengers([...passengers, formData]);
      setSelectedSeats([...selectedSeats, formData.seatNumber]);
      setFormData({ fullName: '', email: '', seatNumber: '' });
    } else {
      alert('Please enter valid passenger details and select an available seat.');
    }
  };

  const isSeatSelected = (seatNumber) => {
    return selectedSeats.includes(seatNumber);
  };

  const selectSeat = (seatNumber) => {
    if (!isSeatSelected(seatNumber)) {
      setFormData({ ...formData, seatNumber });
    } else {
      alert('Please select a valid and available seat.');
    }
  };

  const completeBooking = () => {
    // Perform additional actions to complete the booking, e.g., send data to server
    alert('Booking completed!');
  };

  return (
    <div>
      <h1>Flight Reservation</h1>

      <form>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </form>

      <div>
        <h3>Seats:</h3>
        <div>
          {allSeats.map((seat) => (
            <button
              key={seat}
              onClick={() => selectSeat(seat)}
              disabled={isSeatSelected(seat)}
              style={{
                backgroundColor: isSeatSelected(seat) ? 'red' : 'green',
                margin: '5px',
              }}
            >
              {seat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Selected Seat:</h3>
        <p>{formData.seatNumber}</p>
      </div>

      <button type="button" onClick={addPassenger}>
        Add Passenger
      </button>

      <div>
        <h3>Passengers:</h3>
        {passengers.map((passenger, index) => (
          <p key={index}>
            {index + 1}. {passenger.fullName} - {passenger.email} - {passenger.seatNumber}
          </p>
        ))}
      </div>

      <button onClick={completeBooking}>Complete Booking</button>
    </div>
  );
};

export default TicketBookingPage;
