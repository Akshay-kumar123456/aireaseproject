package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Airline;

public interface AirlineRepository extends JpaRepository<Airline,Integer> {
     
	@Query("SELECT COUNT(a) FROM Airline a")
	long getTotalAirlines();
   
	@Query("select a from Airline a where a.user.id=?1")
	Airline getbyuserid(int id);

}
