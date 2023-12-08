package com.airlinereservationsystem.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.enums.Role;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.AirlineService;
import com.airlinereservationsystem.main.service.CustomerFlightService;
import com.airlinereservationsystem.main.service.UserService;

@RestController
@RequestMapping("/airline")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AirlineController {

	@Autowired
	private AirlineService airlineService;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private CustomerFlightService customerFlightService;

	
	/*
	localhost:8081/airline/add
	
	{
  "name": "Air India Express",
  "code": "IX",
  "user": {
    "username": "aieadmin",
    "password": "AirIndiaExpressPass!123"
          }
    }
	*/
	@PostMapping("/add")//adding new airline
	public Airline addAirline(@RequestBody Airline airline) {

		User user = airline.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		user.setRole(Role.AIRLINE);
		user = userService.insert(user);
		airline.setUser(user);
		return airlineService.insert(airline);
	}
	//localhost:8081/airline/getone/26
	@GetMapping("/getone/{id}") // Geting Airline By Id
	public ResponseEntity<?> getAirline(@PathVariable("id") int id) {
		try {
			Airline airline = airlineService.getAirline(id);
			return ResponseEntity.ok().body(airline);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	//localhost:8081/airline/getall
	@GetMapping("/getall") // Geting All Airlines 
	public List<Airline> getAllAirline(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {
		Pageable pageable = PageRequest.of(page, size); // null null
		return airlineService.getAll(pageable);
	}
    //localhost:8081/airline/delete/26
	@DeleteMapping("/delete/{id}") // Delete Airline By Id
	public ResponseEntity<?> deleteAirline(@PathVariable("id") int id) {

		try {
			Airline airline = airlineService.getAirline(id);

			airlineService.deleteAirline(airline);
			return ResponseEntity.ok().body("Airline deleted successfully");
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
    //localhost:8081/airline/update/18
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateAirline(@PathVariable("id") int id, @RequestBody Airline newAirline) {

		try {
			Airline oldAirline = airlineService.getAirline(id);
			if (newAirline.getName() != null)
				oldAirline.setName(newAirline.getName());
			if (newAirline.getCode() != null)
				oldAirline.setCode(newAirline.getCode());
			oldAirline = airlineService.insert(oldAirline);
			return ResponseEntity.ok().body(oldAirline);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	   //localhost:8081/airline/statistics/flights/44
	    @GetMapping("/statistics/flights/{aid}")
	    public ResponseEntity<?> getTotalFlights(@PathVariable("aid")int aid) {
	        int totalFlights = customerFlightService.getTotalFlights(aid);
	        return ResponseEntity.ok(totalFlights);
	    }
	    
	    //localhost:8081/airline/statistics/income/46
	    @GetMapping("/statistics/income/{aid}")
	    public ResponseEntity<Double> getTotalIncome(@PathVariable("aid")int airlineId) {
	        Double totalIncome = customerFlightService.getTotalIncome(airlineId);
	        return ResponseEntity.ok(totalIncome != null ? totalIncome : 0);
	    }
        //localhost:8081/airline/statistics/passengers/46
        @GetMapping("/statistics/passengers/{aid}")
	    public ResponseEntity<Long> getTotalPassengers(@PathVariable("aid")int aid ) {
	        long totalPassengers = customerFlightService.getTotalPassengers( aid);
	        return ResponseEntity.ok(totalPassengers);
	    }
}
