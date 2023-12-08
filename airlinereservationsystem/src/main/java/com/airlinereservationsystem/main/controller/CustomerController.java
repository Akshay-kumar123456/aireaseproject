package com.airlinereservationsystem.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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



import com.airlinereservationsystem.main.enums.Role;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Customer;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.CustomerService;
import com.airlinereservationsystem.main.service.UserService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/customer")
public class CustomerController {
	@Autowired
	private UserService userService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private PasswordEncoder passwordEncoder;
    //localhost:8081/customer/signup
	/*
	   {
    "name": "Aarav Gupta",
    "age": 32,
    "gender": "Male",
    "email": "aarav.gupta@example.com",
    "phone": "9876543210",
    "user": {
      "username": "aarav32",
      "password": "AaravGupta@123"
    }
    }
  */
	@PostMapping("/signup") // signup customer
	public Customer signUp(@RequestBody Customer customer) {

		User user = customer.getUser();
		String passwordPlain = user.getPassword();
		String encodedPassword = passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		user.setRole(Role.CUSTOMER);
		user = userService.insert(user);
		customer.setUser(user);
		return customerService.insert(customer);
	}
    //localhost:8081/customer/getone/14
	@GetMapping("/getone/{id}") //get customer by ID
	public ResponseEntity<?> getCustomer(@PathVariable("id") int id) {

		try {
			Customer customer = customerService.getCustomer(id);
			return ResponseEntity.ok().body(customer);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
	//localhost:8081/customer/getall
	@GetMapping("/getall") // get all customer at one time
	public List<Customer> getAllCustomer(
			@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {

		Pageable pageable = PageRequest.of(page, size); // null null
		return customerService.getAll(pageable);

	}
    //localhost:8081/customer/delete/14
	@DeleteMapping("/delete/{id}")//Delete Customer By Id
	public ResponseEntity<?> deleteCustomer(@PathVariable("id") int id) {

		try {

			Customer customer = customerService.getCustomer(id);

			customerService.deleteCustomer(customer);
			return ResponseEntity.ok().body("Customer deleted successfully");

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
//localhost:8081/customer/update/12
	/* {
    "name": "Sneha Patel",
    "age": 25,
    "gender": "Female",
    "email": "sneha.patel@example.com",
    "phone": "8765432109",
    "user": {
      "username": "sneha25",
      "password": "SnehaPatel@456"
    }
  } */
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateCustomer(@PathVariable("id") int id, @RequestBody Customer newCustomer) {
		try {
			Customer oldCustomer = customerService.getCustomer(id);
			if (newCustomer.getName() != null)
				oldCustomer.setName(newCustomer.getName());
			if (newCustomer.getAge() != 0)
				oldCustomer.setAge(newCustomer.getAge());
			if (newCustomer.getEmail() != null)
				oldCustomer.setEmail(newCustomer.getEmail());
			if (newCustomer.getGender() != null)
				oldCustomer.setGender(newCustomer.getGender());
			if (newCustomer.getPhone() != null)
				oldCustomer.setPhone(newCustomer.getPhone());
			oldCustomer = customerService.insert(oldCustomer);
			return ResponseEntity.ok().body(oldCustomer);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
}