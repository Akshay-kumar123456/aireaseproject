package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airlinereservationsystem.main.model.CustomerFlight;

public interface CustomerFlightRepository extends JpaRepository<CustomerFlight, Integer>{

}
