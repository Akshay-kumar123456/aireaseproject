package com.airlinereservationsystem.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.dto.AirlineDto;
import com.airlinereservationsystem.main.dto.CustomerDto;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.AirlineService;
import com.airlinereservationsystem.main.service.UserService;

@RestController
public class AirlineController {
	
	@Autowired
	private AirlineService  airlineService;
	@Autowired
	private UserService userService;
	@Autowired 
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping("/airline/signup")
	public Airline signup(@RequestBody Airline airline) {
		
		User user = airline.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		user.setRole("AIRLINE");
		user = userService.insert(user);
		airline.setUser(user);
		return airlineService.insert(airline);

	}
		@GetMapping("/airline/getone/{id}")
		public ResponseEntity<?> getAirline(@PathVariable("id") int id) {
	try {
		Airline airline = airlineService.getAirline(id);
		return  ResponseEntity.ok().body(airline);
	} catch (InvalidIDException e) {
		return ResponseEntity.badRequest().body(e.getMessage());
	}
		}

		
		@GetMapping("/airline/getall")
		public List<Airline> getAllAirline(
				@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
				@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {
			Pageable pageable = PageRequest.of(page, size); // null null
			return airlineService.getAll(pageable);
		}
		@DeleteMapping("/airline/delete/{id}")
		public ResponseEntity<?> deleteAirline(@PathVariable("id") int id) {

			try {
				Airline airline = airlineService.getAirline(id);
				airlineService.deleteAirline(airline);
				return ResponseEntity.ok().body("Airline deleted successfully");
			} catch (InvalidIDException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
			}
		@PutMapping("/airline/update/{id}")
		public ResponseEntity<?> updateAirline(@PathVariable("id") int id, @RequestBody AirlineDto newAirline) {

			try {
				Airline oldAirline = airlineService.getAirline(id);
				if (newAirline.getName()!= null)
					oldAirline.setName(newAirline.getName());
				if(newAirline.getCode()!= null)
			        oldAirline.setCode(newAirline.getCode());
				oldAirline = airlineService.insert(oldAirline);
				return ResponseEntity.ok().body(oldAirline);

			} catch (InvalidIDException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
		}}
		
