package com.airlinereservationsystem.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.repository.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	public Customer insert(Customer customer) {

		return customerRepository.save(customer);
	}

	public Customer getCustomer(int id) throws InvalidIDException {
		Optional<Customer> optional = customerRepository.findById(id);
		if (!optional.isPresent()) {
			throw new InvalidIDException("Customer ID invalid");
		}
		return optional.get();

	}

	public  List<Customer> getAll(Pageable pageable) {
		return customerRepository.findAll(pageable).getContent();
	}
    
	public void deleteCustomer(Customer customer) {
		customerRepository.delete(customer);
		
	}

	public Customer getByUserId(int id) {
		
		return customerRepository.findusinguser(id);
	}
}
