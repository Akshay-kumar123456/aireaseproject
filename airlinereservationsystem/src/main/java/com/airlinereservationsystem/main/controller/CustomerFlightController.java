package com.airlinereservationsystem.main.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.CustomerFlight;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.service.CustomerFlightService;
import com.airlinereservationsystem.main.service.CustomerService;
import com.airlinereservationsystem.main.service.FlightService;

@RestController
public class CustomerFlightController {
	@Autowired
	private CustomerService customerService;
	@Autowired
	private FlightService flightService;

	@Autowired
	private CustomerFlightService customerFlightService;
	
	
	
	/*localhost:8081/flight/book/20/17
	{
    "seatNumber":"S35"
    } 
	 */

	@PostMapping("/flight/book/{cid}/{fid}")
	public ResponseEntity<?> bookTicket(@PathVariable("cid") int cid, @PathVariable("fid") int fid,
			@RequestBody CustomerFlight customerFlight) {

		try {
			Customer customer = customerService.getCustomer(cid);
			Flight flight = flightService.getById(fid);
			customerFlight.setCustomer(customer);
			customerFlight.setFlight(flight);	
			customerFlight.setDate( LocalDate.now());
			customerFlight= customerFlightService.insert(customerFlight);
			return ResponseEntity.ok().body(customerFlight);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		

	}
	
	
	
	//localhost:8081/flight/bookings/20
	@GetMapping("/flight/bookings/{cid}")//get your bookings
	public ResponseEntity<?> getYourBookings(@PathVariable("cid")int cid) {
		
		
		try {
			Customer customer = customerService.getCustomer(cid);
			List<CustomerFlight> list = customerFlightService.getMyBookings(cid);
			return ResponseEntity.ok().body(list);
			
			
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}	
		}

}
