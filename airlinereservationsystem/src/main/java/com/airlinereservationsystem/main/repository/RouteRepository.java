
package com.airlinereservationsystem.main.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Route;

public interface RouteRepository extends JpaRepository<Route, Integer> {
    @Query("select r from Route r where r.departureCity=?1 and r.arrivalCity=?2")
	Optional<Route> getRoute(String source, String destination);
     
	
	

	

	

}
