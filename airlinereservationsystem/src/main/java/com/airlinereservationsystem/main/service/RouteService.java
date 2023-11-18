package com.airlinereservationsystem.main.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Route;
import com.airlinereservationsystem.main.repository.RouteRepository;


@Service
public class RouteService {
	@Autowired
	private RouteRepository routeRepository;

	public Route insert(Route route) {
		
		return routeRepository.save(route) ;
	}

	
	public 	Route getRoute(int id) throws InvalidIDException {
		Optional<Route>optional = routeRepository.findById(id);
		if(!optional.isPresent())
			throw new InvalidIDException("Route id invalid");
		return optional.get();
	}


	public List<Route> getAll(Pageable pageable) {
		return routeRepository.findAll(pageable).getContent();
		
	}


	public void deleteRoute(Route route) {
		routeRepository.delete(route);
	}


	


	public Route getidbySD(String source, String destination) throws InvalidIDException {
		
	Optional<Route> optional =	routeRepository.getRoute(source,destination);
	    if(!optional.isPresent())
	    	throw new InvalidIDException("no routes avaliable, you need to add this route");
	    	
		return optional.get();
	}


	
}
