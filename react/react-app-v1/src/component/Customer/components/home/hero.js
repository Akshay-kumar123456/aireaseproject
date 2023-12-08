import { Col, Container, Image, Row } from "react-bootstrap";
import Imageside from "/React start/React1/airease/src/component/assets/Pic1.png";
import sime from "/React start/React1/airease/src/component/assets/images.jpeg";
import"/React start/React1/airease/src/component/Customer/components/home/hero.css"
import airindia from "/React start/React1/airease/src/component/assets/Air_India-Logo.wine.png";
import IndiGo from "/React start/React1/airease/src/component/assets/IndiGo-Logo.png";
import Akasaair from "/React start/React1/airease/src/component/assets/Akasa_Air_logo_with_slogan-removebg-preview.png";

import jetair from "/React start/React1/airease/src/component/assets/jet-airways_27ccf6.png";
import vistara from "/React start/React1/airease/src/component/assets/1594624034_qMXDCL_Untitled_design_44_-removebg-preview.png";
import gofirst from "/React start/React1/airease/src/component/assets/Go_First_RGB_Logo_1_reduced-removebg-preview.png";
import { useNavigate } from "react-router";
function HeroComponent(){
  const navigate = useNavigate();

  const handleSearchFlights = () => {
    // Retrieve customer ID from local storage
    const customerId = localStorage.getItem('id');

    // Navigate to the search flights page with customer ID as a parameter
    navigate('/search/flights/'+customerId);
  };

    return(
        <div>
            {/* <div className="px-4 py-5 my-5 text-center">
    <Image className="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
    <h1 className="display-5 fw-bold">Manage All Your Bookings With Ease...!</h1>
    <div className="col-lg-6 mx-auto">
      <p className="lead mb-4">"Elevate Your Journey with Seamless Bookings, Instant Updates and Exceptional Service - Where Every Flight Feels Like Home "</p>
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
      </div>
    </div>
  </div> */}

  {/* <div className="container col-xxl-8 px-4 py-5 align-items-center" style={{width:1400,marginTop:-40}}>
    <div className="row flex-lg-row-reverse align-items-left g-5 py-5">
      <div className="col-10 col-sm-8 col-lg-6" style={{backgroundColor:'#E5E5E5' , width: 448,
height: 472}}  >
        
        <Image src={Imageside}  className="d-block mx-lg-auto img-fluid shadow-box-example hoverable"  style={{position: 'absolute'}}alt="Bootstrap Themes" width="303" height="504" loading="lazy"/>
        <Image
          src={sime}
          style={{ position: 'absolute', top: 480, left: 830, width: '243px', height: '168px',borderRadius: '15px' }}
          alt="Second Image"
        />
    
      
      </div>
      <div className="col-lg-6" style={{textAlign:"left",marginTop:150 }}>
        <h1 className="display-5 fw-bold lh-3 mb-3" >Manage All Your Bookings With Ease...!</h1>
        <p className="lead">"Elevate Your Journey with Seamless Bookings, Instant Updates and Exceptional Service - Where Every Flight Feels Like Home "</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center" style={{margin:50}}>
          <button type="button" class="btn btn-primary btn-lg px-4 me-md-2" style={{width:200}}>Search Flights</button>
         
        </div>
      </div>
    </div>
  </div> */}


  <div className="hero" style={{marginRight:180}}>
    <div className="data" style={{marginTop:-130}}>
       <div className="col-lg-7" style={{textAlign:"left",marginTop:120,width:500 }}>
        <h1 className="display-5 fw-bold lh-3 mb-3" >Manage All Your Bookings With Ease...!</h1>
        <p className="lead">"Elevate Your Journey with Seamless Bookings, Instant &nbsp;Updates and Exceptional Service <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Where Every Flight Feels Like Home "</p>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center" style={{margin:10}}>
          <button type="button" className="btn btn-primary btn-lg px-3 me-md-1" onClick={handleSearchFlights} style={{width:200}}>Search Flights</button>
         </div>
        </div>
    </div>
    <div className="image" style={{marginTop:70,marginLeft:70,paddingLeft:50,width:400}}>
    <div className="row flex-lg-row-reverse align-items-left g-5 py-5" style={{margin:120}} >
      <div style={{ width: 448,height: 472}}  >
        
        <Image src={Imageside}  className="d-block mx-lg-auto img-fluid shadow-box-example hoverable"  style={{position: 'absolute',top: 178, left: 1000}}alt="Bootstrap Themes" width="303" height="504" loading="lazy"/>
        <Image
          src={sime}
          style={{ position: 'absolute', top: 490, left: 920, width: '243px', height: '168px',borderRadius: '15px' }}
          alt="Second Image"
        />
    
      </div>
      </div>
    </div>

  </div>
  <Container>
  <div className="card">
  <h5 className="card-header">Airline Partners</h5>
  <div className="card-body">
  <Row>
        {/* <Col>
          <Image src={airindia} alt="Air India" style={{ width: '75%', height: '150%',marginTop:"-40px" }} />
        </Col> */}
        <Col>
          <Image src={IndiGo} alt="IndiGo" style={{ width: '50%', height: 'auto' }} />
        </Col>
        <Col>
          <Image src={Akasaair} alt="Air India" style={{ width: '50%', height: 'auto',marginTop:30 }} />
        </Col>
        <Col>
          <Image src={gofirst} alt="Air India" style={{ width: '55%', height: 'auto',marginTop:-5 }} />
        </Col>
      </Row>
      <Row>
        <Col style={{marginTop:50}}>
          <Image src={jetair} alt="Air India" style={{ width: '250px', height: 'auto',marginTop:"-40px",paddingRight:-140 }} />
        </Col>
        <Col>
          <Image src={airindia} alt="Air India" style={{ width: '60%', height: '150%',marginTop:"-40px" }} />
        </Col>
        <Col>
          <Image src={vistara} alt="Air India" style={{ width: '200px', height: '120%',marginTop:"-50px" ,paddingLeft:-140 }} />
        </Col>
        
      </Row>
  </div>
</div>
      
    </Container>

    <Container>
      hiiii
    </Container>
        </div>



    );
}
export default HeroComponent;