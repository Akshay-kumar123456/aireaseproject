package com.airlinereservationsystem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.Feedback;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.service.CustomerService;
import com.airlinereservationsystem.main.service.FeedbackService;
import com.airlinereservationsystem.main.service.FlightService;

@RestController
public class FeedbackController {
	@Autowired
	private CustomerService customerService;
	@Autowired
	private FeedbackService feedbackService;
	@Autowired
	private FlightService flightService;
	

	
@PostMapping("/feedback/{cid}/{fid}")
public ResponseEntity<?> WriteFeedback(@PathVariable("cid") int cid, @PathVariable("fid") int fid, @RequestBody Feedback  feedback) {
	
	try {
		Customer customer = customerService.getCustomer(cid);
		Flight flight = flightService.getById(fid);
		
		
		feedback.setCustomer(customer);
		feedback.setFlight(flight);
		feedbackService.insert(feedback);
		return ResponseEntity.ok().body(feedback);
		
		
	}catch (InvalidIDException e) {
		return ResponseEntity.badRequest().body(e.getMessage());
	}
}
	
	@GetMapping("/feedback/getone/{id}")
	public ResponseEntity<?> getFeedback(@PathVariable("id")int id){
		try {
			Feedback feedback = feedbackService.getById(id);
			return  ResponseEntity.ok().body(feedback);
		}
		catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		
	
}
}
}