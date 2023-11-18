package com.airlinereservationsystem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.enums.Role;
import com.airlinereservationsystem.main.model.Executive;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.ExecutiveService;
import com.airlinereservationsystem.main.service.UserService;

@RestController
@RequestMapping("/executive")
public class ExecutiveController {
	@Autowired
	private ExecutiveService executiveService;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	//localhost:8081/executive/add
/*
   {
"name":"akshy",
"email":"akshy123@gmail.com",
"user":{
        "username":"akshy",
        "password":"akshy@123"
       }
   }
*/
	@PostMapping("/add") // adding new excuitev
	public Executive addExecucutive(@RequestBody Executive executive) {
		 
		User user = executive.getUser();
		String passwordPlain =user.getPassword();
		String encodedPassword =passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		user.setRole(Role.EXECUTIVE);
		user=userService.insert(user);
		executive.setUser(user);
		return executiveService.insert(executive);
		
	}
	
	
	
	@GetMapping("/totalairlines")
    public ResponseEntity<Long> getTotalAirlines() {
        long totalAirlines = executiveService.getTotalAirlines();
        return ResponseEntity.ok(totalAirlines);
    }

 
    @GetMapping("/totalusers")
    public ResponseEntity<Long> getTotalUsers() {
        long totalUsers = executiveService.getTotalUsers();
        return ResponseEntity.ok(totalUsers);
    }

    
    @GetMapping("/totalfeedbacks")
    public ResponseEntity<Long> getTotalFeedbacks() {
        long totalFeedbacks = executiveService.getTotalFeedbacks();
        return ResponseEntity.ok(totalFeedbacks);
    }

}
