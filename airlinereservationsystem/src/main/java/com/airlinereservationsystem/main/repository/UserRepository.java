package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airlinereservationsystem.main.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsername(String username) ;
		
	
		
	

}
