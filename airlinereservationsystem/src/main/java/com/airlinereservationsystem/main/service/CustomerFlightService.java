package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.CustomerFlight;
import com.airlinereservationsystem.main.repository.CustomerFlightRepository;

@Service
public class CustomerFlightService {

	@Autowired
	private FlightService flightservice;
	@Autowired
	private CustomerFlightRepository customerFlightRepository;

	public CustomerFlight insert(CustomerFlight customerFlight) {
		return customerFlightRepository.save(customerFlight);

	}

	public List<CustomerFlight> getMyBookings(int cid) {

		return customerFlightRepository.getMyBookings(cid);
	}

	public double price(int fid, int age) {
		double fare = flightservice.getfare(fid);
		if (age>18)
			return fare;
		if (age>12)
			return (fare*0.5);
		return (fare*0.2);
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


