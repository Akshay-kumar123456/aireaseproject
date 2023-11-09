package com.airlinereservationsystem.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.model.Executive;
import com.airlinereservationsystem.main.repository.ExecutiveRepository;

@Service
public class ExecutiveService {
   @Autowired
	private ExecutiveRepository executiveRepository;
	
	public Executive insert(Executive executive) {
		
		return executiveRepository.save(executive);
	}

}
