package com.airlinereservationsystem.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
@CrossOrigin(origins = {"http://localhost:3000"})
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
	
	@PostMapping("/seats/add/{fid}")
	public ResponseEntity<?> addSeats(@RequestBody List<Seat> seats, @PathVariable("fid") int id) {

	    try {
	        Flight flight = flightService.getById(id);

	        for (Seat seat : seats) {
	            seat.setStatus(Status.Available);
	            seat.setFlight(flight);
	            seatService.insert(seat);
	        }

	        return ResponseEntity.ok().body(seats);
	    } catch (InvalidIDException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}

	 @GetMapping("/getall/{fid}")
	 public List<?> getallseats(@PathVariable("fid")int id) {
		List<?> list =  seatService.getall(id);
		System.out.println(list);
		return list;
		 
	 }
	
	 @GetMapping("/getavaliable/{fid}")
	 public List<?> getseats(@PathVariable("fid")int id) {
			List<?> list =  seatService.getseats(id);
			System.out.println(list);
			return list;
	 }

}
