import { Button, Image } from "react-bootstrap";
import Navairline from "./navairline";


function About(){




    return(<div>
       <Navairline/>
        <div className="px-4 py-5 my-5 text-center">
   
    <h1 className="display-5 fw-bold">Easy and Free,<br/>
Created for Everyone.</h1>
<br/>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">"AirEase empowers you to effortlessly manage your flight reservations, ensuring seamless tracking without any delays."</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
       
        <Button type="button" className="btn btn-primary-outline btn-lg px-4">Search Flights</Button>
      </div>
    </div>
  </div>

  <div className="container">

  </div>












    </div>)
}
export default About;