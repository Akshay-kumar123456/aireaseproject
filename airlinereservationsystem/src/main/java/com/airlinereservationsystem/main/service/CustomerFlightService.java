package com.airlinereservationsystem.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.model.CustomerFlight;
import com.airlinereservationsystem.main.repository.CustomerFlightRepository;

@Service
public class CustomerFlightService {
@Autowired
private CustomerFlightRepository customerFlightRepository;
	public CustomerFlight insert(CustomerFlight customerFlight) {
		return customerFlightRepository.save(customerFlight);
		
	}

}
