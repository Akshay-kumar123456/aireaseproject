package com.airlinereservationsystem.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;

import com.airlinereservationsystem.main.repository.AirlineRepository;

@Service
public class AirlineService {
	@Autowired
	private AirlineRepository airlineRepository;

	public Airline insert(Airline airline) {

		return airlineRepository.save(airline);
	}

	public Airline getAirline(int id) throws InvalidIDException {
		Optional<Airline> optional = airlineRepository.findById(id);
		if (!optional.isPresent()) {
			throw new InvalidIDException("Airline ID invalid");
		}
		return optional.get();
	}

	public List<Airline> getAll(Pageable pageable) {
		return airlineRepository.findAll(pageable).getContent();
	}

	public void deleteAirline(Airline airline) {
		airlineRepository.delete(airline);
	}

	public Airline getByUserId(int id) {
		// TODO Auto-generated method stub
		return airlineRepository.getbyuserid(id);
	}
}