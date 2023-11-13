package com.airlinereservationsystem.main.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
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
import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.model.Route;
import com.airlinereservationsystem.main.service.AirlineService;
import com.airlinereservationsystem.main.service.FlightService;
import com.airlinereservationsystem.main.service.RouteService;

@RestController
public class FlightController {
	@Autowired
	private FlightService flightService;
	@Autowired
	private AirlineService airlineService;
	@Autowired
	private RouteService routeService;

	/*
	 * localhost:8081/flight/add/7/3 { "code":" ", "departureTime":" ",
	 * "departureDate":" ", "arrivalDate":" ", "availableSeats": , "price": }
	 */

	@PostMapping("/flight/add/{aid}/{rid}") // adding flights by taking airline id and route id
	public ResponseEntity<?> addFlight(@PathVariable("aid") int aid, @PathVariable("rid") int rid,
			@RequestBody Flight flight) {

		try {
			Airline airline = airlineService.getAirline(aid);
			flight.setAirline(airline);
			Route route = routeService.getRoute(rid);
			flight.setRoute(route);
			flight = flightService.insert(flight);
			return ResponseEntity.ok().body(flight);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// localhost:8081/flight/getbyairline/7
	@GetMapping("/flight/getbyairline/{aid}") // get flights by airline id
	public ResponseEntity<?> getFlight(@PathVariable("aid") int aid) {
		try {
			Airline airline = airlineService.getAirline(aid);
			List<Flight> list = flightService.getFlightsByAirline(aid);
			return ResponseEntity.ok().body(list);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	// localhost:8081/flight/all?page=1&size=2
	@GetMapping("/flight/all") // get all flights
	public List<Flight> getAllFlights(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "1000000") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return flightService.getAllFlights(pageable);
	}

	// localhost:8081/flight/HYDERABAD/DELHI/2023-12-01
	@GetMapping("/flight/{source}/{destination}/{date}") // get flights by source and destination
	public List<Flight> getFlightsbysdd(@PathVariable("source") String source,
			@PathVariable("destination") String destination,
			@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		List<Flight> list = flightService.findby(source, destination, date);
		return list;

	}

	// localhost:8081/flight/2023-12-01
	@GetMapping("/flight/{date}") // find flights by date
	public List<Flight> getByDate(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

		return flightService.getByDate(date);

	}

	// localhost:8081/flight/16
	@DeleteMapping("/flight/{fid}")//delete flight by flight id
	public ResponseEntity<?> deleteflight(@PathVariable("fid") int fid) {
		try {
			Flight flight = flightService.getById(fid);
			flightService.deleteFlight(fid);
			return ResponseEntity.ok().body("flight deleted successfully");
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
	
	
	@GetMapping("flight/getbyairline/{date}/{aid}")
	public ResponseEntity<?> getflight(@PathVariable("aid")int aid,
	@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
		try {
			Airline airline = airlineService.getAirline(aid);
			
			List<Flight> list = flightService.findBy(aid,date);
			
			if (list.isEmpty()) {
				return ResponseEntity.ok().body("No flights are avalible");
			}
				return ResponseEntity.ok().body(list);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
			
		}
	}
	
	
	/*localhost:8081/flight/update/18
	{
    "price":1500
    }
	 */
	@PutMapping("/flight/update/{id}") //update flight
	public ResponseEntity<?> updateFlight(@PathVariable("id") int id, @RequestBody Flight flight) {
	    try {
	        Flight flight1 = flightService.getById(id);
	        if (flight.getAvailableSeats() != 0)
	            flight1.setAvailableSeats(flight.getAvailableSeats());
	        if (flight.getCode() != null)
	            flight1.setCode(flight.getCode());
	        if (flight.getDepartureTime() != null)
	            flight1.setDepartureTime(flight.getDepartureTime());
	        if (flight.getDepartureDate() != null)
	            flight1.setDepartureDate(flight.getDepartureDate());
	        if (flight.getArrivalDate() != null)
	            flight1.setArrivalDate(flight.getArrivalDate());
	        if (flight.getPrice() != 0) {
	            flight1.setPrice(flight.getPrice());
	        }
	        
	        // Save the updated flight to the service
	        flight1 = flightService.insert(flight1);
	        
	        return ResponseEntity.ok().body(flight1);
	    } catch (InvalidIDException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}
	
	
	
	@GetMapping("/flight/getreq")
	public void getReq(@RequestParam( value="airline",required = false)String Airline,@RequestParam(value = "timings",required = false)String Timings) {
		//List<Flight> list = flightService.getReq(Airline,Timings);
	}
	
	
	
	
	
	
	
	
	

}
