package com.airlinereservationsystem.main.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Flight;

public interface FlightRepository extends JpaRepository<Flight, Integer> {

	List<Flight> findByAirlineId(int aid);

	
	@Query("SELECT f FROM Flight f WHERE f.route.departureCity = ?1 AND f.route.arrivalCity = ?2 AND f.departureDate = ?3")
	List<Flight> findBy(String source, String destination, LocalDate date);


	List<Flight> getBydepartureDate(LocalDate date);

	@Query("SELECT f FROM Flight f WHERE f.route.departureCity = ?1 AND f.route.arrivalCity = ?2 AND f.departureDate = ?3")
	List<Flight> findBy(String source, String destination, String date);


	
	@Query("SELECT f FROM Flight f where f.airline.id = ?1 and f.departureDate = ?2")
	List<Flight> findBy(int aid, LocalDate date);

    @Query("update Flight f set f.availableSeats =?1 where f.id=?2 ")
	void update(int i, int fid);

    @Query("SELECT f FROM Flight f WHERE f.route.departureCity = ?1 AND f.route.arrivalCity = ?2 AND f.departureDate = ?3 AND f.airline.id=?4")
	List<Flight> findByfilter(String source, String destination, LocalDate parsedDate, int airlineId);

    @Query("select f from Flight f where f.id =?1 and f.departureDate=?2")
	Flight getbydi(int id, LocalDate date);
    
	

}
/*"SELECT f FROM Flight f " +
"WHERE f.route.source = :source " +
"AND f.route.destination = :destination " +
"AND f.departureDate = :date";*/