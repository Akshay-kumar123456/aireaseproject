package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Feedback;
import com.airlinereservationsystem.main.model.Flight;
import com.airlinereservationsystem.main.repository.FeedbackRepository;

@Service
public class FeedbackService {
@Autowired
private FeedbackRepository feedbackRepository ;
  public Feedback insert(Feedback feedback)
  {
	  return feedbackRepository.save(feedback);
  }
  
  public Optional<Feedback> getFeedbackByCustomer(int cid) {
		
		return feedbackRepository.findById(cid) ;
	}

	
	  public List<Feedback> getAllFeedback(Pageable pageable) {
			
			return feedbackRepository.findAll(pageable).getContent();
  }

	

	
	

	public Feedback getById(int fid) throws InvalidIDException {
		Optional<Feedback> optional = feedbackRepository.findById(fid);
		if (!optional.isPresent()) {
			throw new InvalidIDException("Customer ID invalid");
		}
		return optional.get();
		
	}

	public List<Feedback> getAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return feedbackRepository.findAll();
	}

	
	public void deleteFeedback(Feedback feedback) {
		feedbackRepository.delete(feedback);
		
	}

	public Feedback getFeedback(int id) {
		
		return feedbackRepository.getById(id);
	}


	
}
	
