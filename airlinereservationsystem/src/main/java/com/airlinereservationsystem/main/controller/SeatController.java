package com.airlinereservationsystem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.enums.Status;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.model.Seat;
import com.airlinereservationsystem.main.service.FlightService;
import com.airlinereservationsystem.main.service.SeatService;



@RestController
public class SeatController {
	@Autowired
	private SeatService seatService;
	@Autowired
	private FlightService flightService;
	
	@PostMapping("/seat/add/{fid}")
	public ResponseEntity<?> addseat(@RequestBody  Seat seat ,@PathVariable("fid")int id) {
		
		try {
			Flight flight =flightService.getById(id);
			seat.setStatus(Status.Available);
			seat.setFlight(flight);
			seat = seatService.insert(seat);
	return ResponseEntity.ok().body(seat); 
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
		
		
	}

}
