import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


function GetFlights(){

     const[airline,setAirline]=useState([]);
    const [flights,setFlights] = useState([]);
    // useEffect(() => {
    //     axios.get('http://localhost:8081/flight/all')
    //       .then(response => setFlights(response.data))
          
    //       .catch(error => console.error('Error fetching flights:', error));
      
    //     axios.get('http://localhost:8081/airline/getall')
    //       .then(response => setAirline(response.data))
    //       .catch(error => console.error('Error fetching airlines:', error));
    //   }, []);
      
          
 return(
    <div>

<h3>flights list</h3>

    {
        flights.map((f,index)=><div key={index}>
                 {f.code} {console.log(flights)}{f.departureTime}
            </div>)

    }


   {
    airline.map((a,index)=><div key={index}>

         {a.name}


    </div>
    )
   }






    </div>
 );   
}
export default GetFlights;