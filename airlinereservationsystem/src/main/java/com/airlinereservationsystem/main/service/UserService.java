package com.airlinereservationsystem.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.model.User;
import com.airlinereservationsystem.main.repository.UserRepository;


@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		  User user = userRepository.findByUsername(username);
		  System.out.println(user);
		  return user;
	}

	public User insert(User user) {
		return userRepository.save(user);
	}
}
