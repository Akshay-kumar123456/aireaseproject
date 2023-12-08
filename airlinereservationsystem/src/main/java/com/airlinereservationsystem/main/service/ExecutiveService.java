package com.airlinereservationsystem.main.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.model.Executive;
import com.airlinereservationsystem.main.repository.AirlineRepository;
import com.airlinereservationsystem.main.repository.ExecutiveRepository;
import com.airlinereservationsystem.main.repository.FeedbackRepository;
import com.airlinereservationsystem.main.repository.UserRepository;

@Service
public class ExecutiveService {
   @Autowired
	private ExecutiveRepository executiveRepository;
   @Autowired
    private AirlineRepository airlineRepository;
   @Autowired
   private UserRepository userRepository;
   @Autowired
   private FeedbackRepository feedbackRepository;
   
	
	public Executive insert(Executive executive) {
		
		return executiveRepository.save(executive);
	}
	
	 public long getTotalAirlines() {
	        return airlineRepository.getTotalAirlines();
	    }

	   
	    public long getTotalUsers() {
	        return userRepository.getTotalUsers();
	    }

	    
	    public long getTotalFeedbacks() {
	        return feedbackRepository.getTotalFeedbacks();
	    }

		public Executive getByUserId(int id) {
			
			return executiveRepository.getbyuserid(id);
		}

}
