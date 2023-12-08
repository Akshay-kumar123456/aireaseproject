package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.airlinereservationsystem.main.model.Executive;

public interface ExecutiveRepository extends JpaRepository<Executive, Integer> {
    
	
	@Query("select e from Executive e where e.user.id=?1")
	Executive getbyuserid(int id);

}
