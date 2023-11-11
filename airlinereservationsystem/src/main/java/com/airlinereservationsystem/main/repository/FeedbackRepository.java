package com.airlinereservationsystem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airlinereservationsystem.main.model.Feedback;
import com.airlinereservationsystem.main.model.Flight;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{

	
	List<Feedback> findByCustomerId(int cid);
	Feedback save(Feedback feedback);

}
