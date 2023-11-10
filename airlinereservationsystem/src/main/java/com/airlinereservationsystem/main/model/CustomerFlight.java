package com.airlinereservationsystem.main.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
public class CustomerFlight {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String seatNumber;
	private LocalDate date;
	@ManyToOne
	private Flight flight;
	@ManyToOne
	private Customer customer;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSeatNumber() {
		return seatNumber;
	}
	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public Flight getFlight() {
		return flight;
	}
	public void setFlight(Flight flight) {
		this.flight = flight;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	@Override
	public String toString() {
		return "CustomerFlight [id=" + id + ", seatNumber=" + seatNumber + ", date=" + date + ", flight=" + flight
				+ ", customer=" + customer + "]";
	}
	
	
	
	
}
