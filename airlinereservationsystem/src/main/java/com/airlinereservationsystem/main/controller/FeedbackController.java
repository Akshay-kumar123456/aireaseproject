package com.airlinereservationsystem.main.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
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

	
	/*
	 localhost:8081/feedback/20/18
	 {
   "rating":4.5,
   "text":"a wonderful journey"
      }
	 */
	@PostMapping("/feedback/{cid}/{fid}")
	public ResponseEntity<?> WriteFeedback(@PathVariable("cid") int cid, @PathVariable("fid") int fid,
			@RequestBody Feedback feedback) {

		try {
			Customer customer = customerService.getCustomer(cid);
			Flight flight = flightService.getById(fid);

			feedback.setCustomer(customer);
			feedback.setFlight(flight);
			feedback.setDate(LocalDate.now());
			feedbackService.insert(feedback);
			return ResponseEntity.ok().body(feedback);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	
      //localhost:8081/feedback/getone/23
	@GetMapping("/feedback/getone/{id}")
	public ResponseEntity<?> getFeedback(@PathVariable("id") int id) {
		try {
			Feedback feedback = feedbackService.getById(id);
			return ResponseEntity.ok().body(feedback);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
    
	
	//localhost:8081/feedback/getall
	@GetMapping("/feedback/getall")
	public List<Feedback> getAllFeedback(
			@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {

		Pageable pageable = PageRequest.of(page, size); // null null
		//Pageable pageable = PageRequest.of(page, size, sort)
		return feedbackService.getAll(pageable);

	}
    
	
	//localhost:8081/feedback/delete/23
	@DeleteMapping("/feedback/delete/{id}")
	public ResponseEntity<?> deleteCustomer(@PathVariable("id") int id) {

		try {

			Feedback feedback = feedbackService.getById(id);

			feedbackService.deleteFeedback(feedback);
			return ResponseEntity.ok().body("feedback deleted successfully");

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	
	//localhost:8081/feedback/update/23
	@PutMapping("/feedback/update/{id}")
	public ResponseEntity<?> updateFeedback(@PathVariable("id") int id, @RequestBody Feedback newFeedback) {
		try {
			Feedback oldFeedback = feedbackService.getById(id);
			if (newFeedback.getText() != null)
				oldFeedback.setText(newFeedback.getText());
			if (newFeedback.getRating() != 0)
				oldFeedback.setRating(newFeedback.getRating());
			if (newFeedback.getDate() != null)
				oldFeedback.setDate(newFeedback.getDate());
			oldFeedback = feedbackService.insert(oldFeedback);
			return ResponseEntity.ok().body(oldFeedback);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
}