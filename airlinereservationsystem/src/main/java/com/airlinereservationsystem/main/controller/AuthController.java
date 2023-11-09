package com.airlinereservationsystem.main.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.service.UserService;

public class AuthController {
	
	@Autowired
	private UserService userService;

	@GetMapping("/user/login")
	public User login(Principal  principal) {  
		String username = principal.getName();
		User user = (User)userService.loadUserByUsername(username);
		return user; 

}
}