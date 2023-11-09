package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airlinereservationsystem.main.model.Airline;

public interface AirlineRepository extends JpaRepository<Airline,Integer> {

}
