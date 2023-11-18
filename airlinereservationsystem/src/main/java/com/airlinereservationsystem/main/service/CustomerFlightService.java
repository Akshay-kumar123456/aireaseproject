package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.airlinereservationsystem.main.enums.Seatclass;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.CustomerFlight;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.repository.CustomerFlightRepository;
import com.airlinereservationsystem.main.repository.FlightRepository;

@Service
public class CustomerFlightService {
	@Autowired
	private FlightRepository flightRepository;
	@Autowired
	private CustomerFlightRepository customerFlightRepository;

	public CustomerFlight insert(CustomerFlight customerFlight) {
		return customerFlightRepository.save(customerFlight);

	}

	public List<CustomerFlight> getMyBookings(int cid) {

		return customerFlightRepository.getMyBookings(cid);
	}

	public double price(int fid, int age, Seatclass seatclass) throws InvalidIDException {

		Optional<Flight> optional = flightRepository.findById(fid);
		if (!optional.isPresent())
			throw new InvalidIDException("flight not exist");

		if (seatclass.equals(Seatclass.BUSINESS_CLASS)) {

			double price = optional.get().getBusinessClassPrice();
			if (age >= 12)
				return price;
			else if (age < 12)
				return price * 0.75;
			else if (age < 2)
				return price * 0.40;
		} else if (seatclass.equals(Seatclass.FIRST_CLASS)) {

			double price = optional.get().getFirstClassPrice();
			if (age >= 12)
				return price;
			else if (age < 12)
				return price * 0.75;
			else if (age < 2)
				return price * 0.40;
		} else if (seatclass.equals(Seatclass.ECONOMY_CLASS)) {

			double price = optional.get().getEconomyClassPrice();
			if (age >= 12)
				return price;
			else if (age < 12)
				return price * 0.75;
			else if (age < 2)
				return price * 0.40;
		}

		// You might want to handle the case where an invalid seat class is provided
		throw new IllegalArgumentException("Invalid seat class");
	}

	public CustomerFlight getBooking(int id) throws InvalidIDException {
		Optional<CustomerFlight> optional = customerFlightRepository.findById(id);
		if (!optional.isPresent()) {
			throw new InvalidIDException("BOOKING ID invalid");
		}
		return optional.get();
	}

	public void deleteCustomer(CustomerFlight customerFlight) {
		 customerFlightRepository.delete(customerFlight);
		
	}

	public List<CustomerFlight> getpassengerslist(int fid,LocalDate date) {
		return  customerFlightRepository.getByFlightIdd(fid,date);
	}

	
	public List<CustomerFlight> getpassenger(int fid) {
		return  customerFlightRepository.getByFlightId(fid);
	}
	
	}