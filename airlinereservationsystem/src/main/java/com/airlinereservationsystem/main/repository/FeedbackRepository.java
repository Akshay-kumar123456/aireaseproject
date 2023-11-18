package com.airlinereservationsystem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Feedback;


public interface FeedbackRepository extends JpaRepository<Feedback, Integer>{

	
	List<Feedback> findByCustomerId(int cid);
	Feedback save(Feedback feedback);
	
	@Query("SELECT COUNT(f) FROM Feedback f")
	long getTotalFeedbacks();

}
