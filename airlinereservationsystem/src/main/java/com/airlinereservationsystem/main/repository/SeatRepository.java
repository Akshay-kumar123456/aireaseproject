package com.airlinereservationsystem.main.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Integer>  {

	@Query("select s from Seat s where s.seatNo=?1 and s.flight.id=?2")
	Seat getseat(String seatNumber, int fid);
    @Modifying
	@Query("update Seat s set s.status='NotAvailable' where s.id=?1")
	void updateseat(int id);
    @Query("select s.seatNo from  Seat s where s.flight.id =?1")
	List<?> findAllbytotal(int id);
    
    @Query("select s.seatNo from  Seat s where s.flight.id =?1 AND s.status ='Available'")
	List<?> findavaliable(int id);
   
    @Query("SELECT COUNT(s) FROM Seat s WHERE s.flight.id = ?1 AND s.status = 'Available'")
    int countAvailableSeats(int flightId);

}
