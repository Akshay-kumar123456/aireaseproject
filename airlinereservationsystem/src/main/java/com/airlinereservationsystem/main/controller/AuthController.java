package com.airlinereservationsystem.main.controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.Executive;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.AirlineService;
import com.airlinereservationsystem.main.service.CustomerService;
import com.airlinereservationsystem.main.service.ExecutiveService;
import com.airlinereservationsystem.main.service.UserService;
@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {
	@Autowired
	private Logger logger;
	
	@Autowired
	private UserService userService;
	@Autowired
	private AirlineService airlineService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private ExecutiveService executiveService;

	@PostMapping("/auth/login")
	public User login(Principal  principal) {  
		String username = principal.getName();
		User user = (User)userService.loadUserByUsername(username);
		return user; 

}
	
	
	@PostMapping("/user/login")
	public ResponseEntity<?> userLogin(Principal principal) {
	    String username = principal.getName();
	    User user = (User) userService.loadUserByUsername(username);

	    if (user != null) {
	        switch (user.getRole()) {
	            case CUSTOMER:
	                // Handle login for CUSTOMER role
	                Customer customer = customerService.getByUserId(user.getId());
	                return ResponseEntity.ok(customer);
	            case AIRLINE:
	                // Handle login for AIRLINE role
	                Airline airline = airlineService.getByUserId(user.getId());
	                return ResponseEntity.ok(airline);
	            case EXECUTIVE:
	                // Handle login for EXECUTIVE role
	                Executive executive = executiveService.getByUserId(user.getId());
	                return ResponseEntity.ok(executive);
	            default:
	                // Handle other roles or provide an error response
	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unknown user role");
	        }
	    }

	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
	}

}