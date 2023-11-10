package com.airlinereservationsystem.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.airlinereservationsystem.main.model.Route;

public interface RouteRepository extends JpaRepository<Route, Integer> {

}
