package com.airlinereservationsystem.main.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.airlinereservationsystem.main.model.CustomerFlight;

public interface CustomerFlightRepository extends JpaRepository<CustomerFlight, Integer>{
    
	
	@Query("select cf from CustomerFlight cf where cf.customer.id =?1")
	List<CustomerFlight> getMyBookings(int cid);

	@Query("select cf from CustomerFlight cf where cf.flight.id =?1")
	List<CustomerFlight> getByFlightId(int fid);

	@Query("select cf from CustomerFlight cf where cf.flight.id =?1 and cf.flight.departureDate=?2")
	List<CustomerFlight> getByFlightIdd(int fid, LocalDate date);
	
	
	@Query("SELECT COUNT(f) FROM Flight f where f.airline.id=?1")
	  int getTotalFlights(int aid );

/*	
	@Query("SELECT SUM(cf.price) FROM CustomerFlight cf")
	Double getTotalIncome();
*/
	@Query("SELECT COUNT(cf) FROM CustomerFlight cf where cf.flight.airline.id = ?1")
	long getTotalPassengers(int aid);

	 @Query("SELECT SUM(cf.price) FROM CustomerFlight cf WHERE cf.flight.airline.id = ?1")
	 Double getTotalIncomeForAirline(@Param("airlineId") int airlineId);

	 
//	@Modifying
//	@Query("update Flight f set availableSeats=?1 where f.id =?2")
//	void updateseats(int as, int fid);

}