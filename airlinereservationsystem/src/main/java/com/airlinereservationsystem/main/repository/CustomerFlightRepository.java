package com.airlinereservationsystem.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.CustomerFlight;

public interface CustomerFlightRepository extends JpaRepository<CustomerFlight, Integer>{
    
	
	@Query("select cf from CustomerFlight cf where cf.customer.id =?1")
	List<CustomerFlight> getMyBookings(int cid);

	@Query("select cf from CustomerFlight cf where cf.flight.id =?1")
	List<CustomerFlight> getByFlightId(int fid);

}
