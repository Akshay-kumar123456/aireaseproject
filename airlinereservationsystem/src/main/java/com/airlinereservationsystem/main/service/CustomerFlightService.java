package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

	public List<CustomerFlight> findBy(int fid, LocalDate date) {
		
		return customerFlightRepository.findAll();
	}

}
