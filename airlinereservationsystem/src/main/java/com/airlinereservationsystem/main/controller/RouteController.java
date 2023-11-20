package com.airlinereservationsystem.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.airlinereservationsystem.main.dto.AirlineDto;
import com.airlinereservationsystem.main.dto.RouteDto;
import com.airlinereservationsystem.main.exception.InvalidIDException;
import com.airlinereservationsystem.main.model.Airline;
import com.airlinereservationsystem.main.model.Route;
import com.airlinereservationsystem.main.service.RouteService;

@RestController
@RequestMapping("/route")
public class RouteController {
	@Autowired
	private RouteService routeService;

	/*
	 * localhost:8081/route/add { "departureCity": " ", "arrivalCity": " ",
	 * "distance": , "duration": }
	 */
	@PostMapping("/add")
	public Route addRoute(@RequestBody Route route) {
		return routeService.insert(route);
	}

	// localhost:8081/route/getone/28
	@GetMapping("/getone/{id}")
	public ResponseEntity<?> getRoute(@PathVariable("id") int id) {

		try {
			Route route = routeService.getRoute(id);
			return ResponseEntity.ok().body(route);
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	// localhost:8081/route/getall
	@GetMapping("/getall")
	public List<Route> getAllRoute(@RequestParam(value = "page", required = false, defaultValue = "0") Integer page,
			@RequestParam(value = "size", required = false, defaultValue = "10000000") Integer size) {

		Pageable pageable = PageRequest.of(page, size); // null null return
		return routeService.getAll(pageable);

	}

	// localhost:8081/route/delete/4
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteRoute(@PathVariable("id") int id) {
		try {
			Route route = routeService.getRoute(id);
			routeService.deleteRoute(route);
			return ResponseEntity.ok().body("route deleted successfully");
		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	
	
	//localhost:8081/route/update/112
	/*
{
    "distance":350
}
	 */
	@PutMapping("/update/{id}")
	public ResponseEntity<?> updateRoute(@PathVariable("id") int id, @RequestBody RouteDto newRoute) {

		try {
			Route oldRoute = routeService.getRoute(id);
			if (newRoute.getArrivalCity() != null)
				oldRoute.setArrivalCity(newRoute.getArrivalCity() );
			if(newRoute.getDepartureCity()!= null)
				oldRoute.setDepartureCity(newRoute.getDepartureCity());
			if(newRoute.getDistance()!=0)
				oldRoute.setDistance(newRoute.getDistance());
			if(newRoute.getDuration()!=0)
				oldRoute.setDuration(newRoute.getDuration());
			
			oldRoute = routeService.insert(oldRoute);
			return ResponseEntity.ok().body(oldRoute);

		} catch (InvalidIDException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	
	
	
	
	
	
	
	
}
