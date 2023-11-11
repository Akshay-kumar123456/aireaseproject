package com.airlinereservationsystem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

	@PostMapping("/flight/book/{cid}/{fid}")
	public ResponseEntity<?> bookTicket(@PathVariable("cid") int cid, @PathVariable("fid") int fid,
			@RequestBody CustomerFlight customerFlight) {

		try {
			Customer customer = customerService.getCustomer(cid);
			Flight flight = flightService.getById(fid);
			customerFlight.setCustomer(customer);
			customerFlight.setFlight(flight);	
			
			return ResponseEntity.ok().body(customerFlight);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		

	}

}
