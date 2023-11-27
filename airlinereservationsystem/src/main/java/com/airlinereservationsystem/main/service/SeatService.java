package com.airlinereservationsystem.main.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.airlinereservationsystem.main.model.Seat;
import com.airlinereservationsystem.main.repository.SeatRepository;

@Service
public class SeatService {

	
	@Autowired
	private SeatRepository seatRepository;

	public Seat insert(Seat seat) {
		
		return seatRepository.save(seat);
	}

	public Seat getseat(String seatNumber, int fid) {
		
		return seatRepository.getseat(seatNumber,fid);
	}
   @Transactional
	public void updateseats(int id) {
		seatRepository.updateseat(id);
		
	}
}
