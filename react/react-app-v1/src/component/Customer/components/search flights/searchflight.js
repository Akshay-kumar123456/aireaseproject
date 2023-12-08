// App.js
import React from 'react';
//import GetFlights from "../search flights/search";
import FlightSearch from "../search flights/display";



import NavbarcomponentWL from '../home/navbarf';

function searchFlights() {
  return (
    <div className="app-container">
      <NavbarcomponentWL />
      <div className="main-container">
      {/* <GetFlights/> */}
      <FlightSearch/> 
      </div>
    </div>
  );
}

export default searchFlights;
