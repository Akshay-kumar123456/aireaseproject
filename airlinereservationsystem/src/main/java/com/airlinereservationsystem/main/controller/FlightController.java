package com.airlinereservationsystem.main.controller;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
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

import com.airlinereservationsystem.main.dto.FlightDto;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.model.Route;
import com.airlinereservationsystem.main.repository.FlightRepository;
import com.airlinereservationsystem.main.service.AirlineService;
import com.airlinereservationsystem.main.service.FlightService;
import com.airlinereservationsystem.main.service.RouteService;

@RestController
@RequestMapping("/flight")
@CrossOrigin(origins = {"http://localhost:3000"})
public class FlightController {
	@Autowired
	private FlightService flightService;
	@Autowired
	private AirlineService airlineService;
	@Autowired
	private RouteService routeService;
	@Autowired
	private FlightRepository flightRepository; 

	
	/*
	 * {
    "arrivalDate":"2023-11-19",
    "availableSeats":30,
    "businessClassPrice":22000,
    "code":"UK",
    "departureDate":"2023-11-19",
    "departureTime":"12:00",
    "economyClassPrice":15000,
    "firstClassPrice":19000,
    "source":"Pune",
    "destination":"Lucknow"
}*/
	// localhost:8081/flight/add/18
	@PostMapping("/add/{aid}")
	public ResponseEntity<?> addFlight(@PathVariable("aid") int aid, @RequestBody FlightDto flightDto) {

		try {
			Flight flight = new Flight();
			Airline airline = airlineService.getAirline(aid);
			
			flight.setAirline(airline);
			String source = flightDto.getSource();
			String destination = flightDto.getDestination();
			Route route = routeService.getidbySD(source, destination);
			flight.setRoute(route);
			flight.setCode(flightDto.getCode());
			flight.setDepartureTime(flightDto.getDepartureTime());
			flight.setDepartureDate(flightDto.getDepartureDate());
			flight.setArrivalDate(flightDto.getArrivalDate());
			flight.setEconomyClassPrice(flightDto.getEconomyClassPrice());
			flight.setFirstClassPrice(flightDto.getFirstClassPrice());
			flight.setBusinessClassPrice(flightDto.getBusinessClassPrice());
			flight.setAvailableSeats(flightDto.getAvailableSeats());
			flight = flightService.insert(flight);
			return ResponseEntity.ok().body(flight);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/getbyairline/{aid}") // get flights by airline id
	public ResponseEntity<?> getFlight(@PathVariable("aid") int aid) {
		try {
			Airline airline = airlineService.getAirline(aid);
			List<Flight> list = flightService.getFlightsByAirline(aid);
			return ResponseEntity.ok().body(list);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@GetMapping("/all") // get all flights
	public List<Flight> getAllFlights(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "1000000") Integer size) {
		Pageable pageable = PageRequest.of(page, size);
		return flightService.getAllFlights(pageable);
	}

	@GetMapping("/{source}/{destination}/{date}") // get flights by source and destination
	public List<Flight> getFlightsbysdd(@PathVariable("source") String source,
			@PathVariable("destination") String destination,
			@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		List<Flight> list = flightService.findby(source, destination, date);
		return list;
	}

	// localhost:8081/flight/2023-12-01
	@GetMapping("/{date}") // find flights by date
	public List<Flight> getByDate(@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

		return flightService.getByDate(date);

	}

	@DeleteMapping("/delete/{fid}") // delete flight by flight id
	public ResponseEntity<?> deleteflight(@PathVariable("fid") int fid) {
		try {
			Flight flight = flightService.getById(fid);
			flightService.deleteFlight(fid);
			return ResponseEntity.ok().body("flight deleted successfully");
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
    // localhost:8081/flight/getbyairline/2023-11-19/18
	@GetMapping("/getbyairline/{date}/{aid}")
	public ResponseEntity<?> getflight(@PathVariable("aid") int aid,
			@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
		try {
			Airline airline = airlineService.getAirline(aid);

			List<Flight> list = flightService.findBy(aid, date);

			if (list.isEmpty()) {
				return ResponseEntity.ok().body("");
			}
			return ResponseEntity.ok().body(list);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}
	
	
	
	
	
	@GetMapping("/getbytoday/{aid}")
	public ResponseEntity<?> getflighttoday(@PathVariable("aid") int aid) {
		try {
			Airline airline = airlineService.getAirline(aid);
			LocalDate date =LocalDate.now();

			List<Flight> list = flightService.findBy(aid, date);
			
			return ResponseEntity.ok().body(list);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    // localhost:8081/flight/update/42
	@PutMapping("/update/{id}/{date}") // update flight
	public ResponseEntity<?> updateFlight(@PathVariable("date")String date1, @PathVariable("id") int id, @RequestBody FlightDto flight) {
		try {
			LocalDate date = LocalDate.parse(date1);
			Flight flight1 = flightService.getBydi(id,date);
			if (flight.getCode() != null)
				flight1.setCode(flight.getCode());
			if (flight.getDepartureTime() != null)
				flight1.setDepartureTime(flight.getDepartureTime());
			if (flight.getDepartureDate() != null)
				flight1.setDepartureDate(flight.getDepartureDate());
			if (flight.getArrivalDate() != null)
				flight1.setArrivalDate(flight.getArrivalDate());
			if (flight.getAvailableSeats() != 0)
				flight1.setAvailableSeats(flight.getAvailableSeats());
			if (flight.getBusinessClassPrice() != 0)
				flight1.setBusinessClassPrice(flight.getBusinessClassPrice());
			if (flight.getEconomyClassPrice() != 0)
				flight1.setEconomyClassPrice(flight.getEconomyClassPrice());
			if (flight.getFirstClassPrice() != 0)
				flight1.setFirstClassPrice(flight.getFirstClassPrice());
			if (flight.getSource() != null && flight.getDestination() != null) {
	            Route route = routeService.getidbySD(flight.getSource(), flight.getDestination());
	            flight1.setRoute(route);
			}
			flight1 = flightService.insert(flight1);

			return ResponseEntity.ok().body(flight1);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	
	//localhost:8081/flight/get/filter?airline=Indigo
	 @GetMapping("/get/filter")
	    public List<Flight> getflightsWithFilters(@RequestParam(required = false) String airline) {
	        return flightRepository.findAll().stream()
	        		.filter(flight -> airline == null || (flight.getAirline() != null && flight.getAirline().getName().equals(airline)))
	                .collect(Collectors.toList());
	    }
	 
	 
	 @GetMapping("/getone/{fid}")
	 public ResponseEntity<?> getflight(@PathVariable("fid")int id) {
		 try {
			Flight flight = flightService.getById(id);
			System.out.println(flight);
			return ResponseEntity.ok().body(flight);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
			
		}
	 }
	 
	
	
	
	@GetMapping("/getbysdd")
	public List<Flight> getFlights(
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String date
    ) {
		System.out.println(source+destination+date);
		System.out.println("api called");
		List<Flight> list =flightService.findby(source, destination, date);
		
        return list;
    }
	
	@GetMapping("/getbysdd/filter")
	public List<Flight> filterFlights(
	        @RequestParam(required = false) String source,
	        @RequestParam(required = false) String destination,
	        @RequestParam(required = false) String date,
	        @RequestParam(required = false) Integer airlineId
	) {
	    System.out.println("Filter API called");
	    System.out.println("Source: " + source + ", Destination: " + destination + ", Date: " + date + ", Airline ID: " + airlineId);

	 
	        if (airlineId != null) {
	            // Call the service method to retrieve flights based on the provided filters
	            return flightService.filterFlights(source, destination, date, airlineId);
	        } else {
	            // If airlineId is null, use a different method (e.g., findby) or handle the case accordingly
	            return flightService.findby(source, destination, date);
	        }
	    
	}


	
	@PutMapping("/updateflight/{id}")
	public ResponseEntity<?> updateFlightwithroute (@PathVariable("id") int id, @RequestBody FlightDto flightDto) {
	    try {
	        Flight existingFlight = flightService.getById(id);
	                

	        Airline airline = airlineService.getAirline(existingFlight.getAirline().getId());

	        // If source and destination are provided, update the route
	        if (flightDto.getSource() != null && flightDto.getDestination() != null) {
	            Route route = routeService.getidbySD(flightDto.getSource(), flightDto.getDestination());
	            existingFlight.setRoute(route);
	        }

	        // Update other flight properties
	        existingFlight.setCode(flightDto.getCode());
	        existingFlight.setDepartureTime(flightDto.getDepartureTime());
	        existingFlight.setDepartureDate(flightDto.getDepartureDate());
	        existingFlight.setArrivalDate(flightDto.getArrivalDate());
	        existingFlight.setEconomyClassPrice(flightDto.getEconomyClassPrice());
	        existingFlight.setFirstClassPrice(flightDto.getFirstClassPrice());
	        existingFlight.setBusinessClassPrice(flightDto.getBusinessClassPrice());
	        existingFlight.setAvailableSeats(flightDto.getAvailableSeats());

	        existingFlight = flightService.insert(existingFlight);
	        return ResponseEntity.ok().body(existingFlight);
	    } catch (InvalidIDException e) {
	        return ResponseEntity.badRequest().body(e.getMessage());
	    }
	}

	


	
	
	
	
	
}
