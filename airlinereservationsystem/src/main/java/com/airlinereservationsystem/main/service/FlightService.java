package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;

import com.airlinereservationsystem.main.model.Flight;

import com.airlinereservationsystem.main.repository.FlightRepository;

@Service
public class FlightService {
	@Autowired
	private FlightRepository flightRepository;

	public Flight insert(Flight flight) {

		return flightRepository.save(flight);
	}

	public List<Flight> getFlightsByAirline(int aid) {

		return flightRepository.findByAirlineId(aid);
	}

	public List<Flight> getAllFlights(Pageable pageable) {

		return flightRepository.findAll(pageable).getContent();
	}

	public List<Flight> findby(String source, String destination, LocalDate date) {

		return flightRepository.findBy(source, destination, date);
	}

	public List<Flight> getByDate(LocalDate date) {

		return flightRepository.getBydepartureDate(date);
	}

	public Flight getById(int fid) throws InvalidIDException {

		Optional<Flight> optional = flightRepository.findById(fid);
		if (!optional.isPresent())
			throw new InvalidIDException("flight id invalid");
		return optional.get();
	}

	public void deleteFlight(int fid) throws InvalidIDException {
		flightRepository.deleteById(fid);

	}

	public List<Flight> findBy(int aid, LocalDate date) {

		return flightRepository.findBy(aid, date);
	}
	
//	public List<Flight> findby(String source, String destination, String date) {
//		
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy"); 
//		LocalDate parsedDate = LocalDate.parse(date,formatter);
//		List<Flight> list =flightRepository.findBy(source, destination, parsedDate);
//	
//		return list;
//	}
//   
//	public List<Flight> filterFlights(String source, String destination, String date, int airlineId) {
//		
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy"); 
//		LocalDate parsedDate = LocalDate.parse(date,formatter);
//		List<Flight> list =flightRepository.findByfilter(source, destination, parsedDate,airlineId);
//	
//		return list;
//	}
	public List<Flight> findby(String source, String destination, String date) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); 
	    LocalDate parsedDate = LocalDate.parse(date, formatter);
	    List<Flight> list = flightRepository.findBy(source, destination, parsedDate);
	    return list;
	}

	public List<Flight> filterFlights(String source, String destination, String date, int airlineId) {
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); 
	    LocalDate parsedDate = LocalDate.parse(date, formatter);
	    List<Flight> list = flightRepository.findByfilter(source, destination, parsedDate, airlineId);
	    return list;
	}

	 @Transactional
		public void update(int i, int fid) {
			flightRepository.update(i,fid);
			
		}

	public Flight getBydi(int id, LocalDate date) {
		
		return flightRepository.getbydi(id,date);
	}

	
}