package com.airlinereservationsystem.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.model.Executive;
import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.ExecutiveService;
import com.airlinereservationsystem.main.service.UserService;

@RestController
public class ExecutiveController {
	@Autowired
	private ExecutiveService executiveService;
	@Autowired
	private UserService userService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	/*
	 localhost:8081/executive/add
	 {
       "name":" ",
       "email":" ",
       "user":{
               "username":" ",
                "password":" "
            }
}
	 */
	@PostMapping("/executive/add")
	public Executive addExecucutive(@RequestBody Executive executive) {
		 
		User user = executive.getUser();
		String passwordPlain =user.getPassword();
		String encodedPassword =passwordEncoder.encode(passwordPlain);
		user.setPassword(encodedPassword);
		user.setRole("Executive");
		user=userService.insert(user);
		executive.setUser(user);
		return executiveService.insert(executive);
		
	}
	
	

}
