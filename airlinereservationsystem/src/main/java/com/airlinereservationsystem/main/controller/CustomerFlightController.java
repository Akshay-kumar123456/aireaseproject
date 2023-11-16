package com.airlinereservationsystem.main.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
=======
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
>>>>>>> 19ae6ceb11c191f15e73b43ea9eb291cd46ddfc0
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.airlinereservationsystem.main.dto.PassengerDto;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;
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

	private CustomerFlight customerFlight;

	/*
	 * localhost:8081/flight/book/20/17 { "seatNumber":"S35" }
	 */

	@PostMapping("/flight/book/{cid}/{fid}")
	public ResponseEntity<?> bookTicket(@PathVariable("cid") int cid, @PathVariable("fid") int fid,
			@RequestBody CustomerFlight customerFlight) {
                 
		try {
			Customer customer = customerService.getCustomer(cid);
			Flight flight = flightService.getById(fid);
			customerFlight.setCustomer(customer);
			customerFlight.setFlight(flight);
			customerFlight.setDate(LocalDate.now());
			customerFlight = customerFlightService.insert(customerFlight);
			return ResponseEntity.ok().body(customerFlight);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	// localhost:8081/flight/bookings/20
	@GetMapping("/flight/bookings/{cid}") // get your bookings
	public ResponseEntity<?> getYourBookings(@PathVariable("cid") int cid) {

		try {
			Customer customer = customerService.getCustomer(cid);
			List<CustomerFlight> list = customerFlightService.getMyBookings(cid);
			return ResponseEntity.ok().body(list);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
    //localhost:8081/flight/passengers/114
	@GetMapping("/flight/passengers/{fid}") // get your bookings
	public ResponseEntity<?> getpassengers(@PathVariable("fid") int fid) {

		try {
			Flight flight = flightService.getById(fid);
			List<CustomerFlight> list = customerFlightService.getpassenger(fid);
			return ResponseEntity.ok().body(list);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	//localhost:8081/flight/passengers/114/2023-11-13
	@GetMapping("/flight/passengers/{fid}/{date}") // get your bookings
	public ResponseEntity<?> getpassengers(@PathVariable("fid") int fid,@PathVariable("date")@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date ) {

		try {
			Flight flight = flightService.getById(fid);
			List<CustomerFlight> list = customerFlightService.getpassengerslist(fid,date);
			return ResponseEntity.ok().body(list);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	
	@GetMapping("/flight/{fid}/{date}") 
	public ResponseEntity<?> findBy(@PathVariable("fid") int fid,@PathVariable("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
		
		try {
			Flight flight= flightService.getById(fid);
			List<CustomerFlight> list = customerFlightService.findBy(fid, date);
			return ResponseEntity.ok().body(list);


		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

		
		
	
	
	
	// localhost:8081/booking/family/20/17
	/*
	 * [ {"name": "John", "age": 30, "gender": "Male", "seatNumber": "A1"}, {"name":
	 * "Jane", "age": 25, "gender": "Female", "seatNumber": "A2"} ]
	 */
	@PostMapping("/booking/family/{cid}/{fid}")//book tickets for family
	public ResponseEntity<?> bookTickets(@PathVariable("cid") int cid, @PathVariable("fid") int fid,
			@RequestBody List<PassengerDto> passengerDtoList) {
		try {
			Customer customer = customerService.getCustomer(cid);
			Flight flight = flightService.getById(fid);

			List<CustomerFlight> bookedTickets = new ArrayList<>();
            double totalPrice=0;
			for (PassengerDto passengerDto : passengerDtoList) {
				CustomerFlight customerFlight = new CustomerFlight();
				customerFlight.setCustomer(customer);
				customerFlight.setFlight(flight);
				customerFlight.setDate(LocalDate.now());
				// Set passenger-specific information from the DTO
				customerFlight.setName(passengerDto.getName());
				customerFlight.setAge(passengerDto.getAge());
				customerFlight.setGender(passengerDto.getGender());
				customerFlight.setPrice(customerFlightService.price(fid,passengerDto.getAge()));
				customerFlight.setSeatNumber(passengerDto.getSeatNumber());
                totalPrice = totalPrice+(customerFlight.getPrice());
				// Add the processed ticket to the list
				bookedTickets.add(customerFlightService.insert(customerFlight));
			}

			Map<String, Object> response = new HashMap<>();
	        response.put("bookedTickets", bookedTickets);
	        response.put("totalPrice", totalPrice);

	        return ResponseEntity.ok().body(response);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
	
	
	@GetMapping("/bookings/{cid}")
	public List<Customer> getAllCustomer(
			@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {

		Pageable pageable = PageRequest.of(page, size); // null null
		return customerService.getAll(pageable);

	}
	
	//localhost:8081/booking/delete/129
	@DeleteMapping("/booking/delete/{bid}")
	public ResponseEntity<?> deleteBooking(@PathVariable("bid") int id) {
		try {
			CustomerFlight customerFlight = customerFlightService.getBooking(id);

			customerFlightService.deleteCustomer(customerFlight);
			return ResponseEntity.ok().body("Booking deleted successfully");

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	
	 
}
