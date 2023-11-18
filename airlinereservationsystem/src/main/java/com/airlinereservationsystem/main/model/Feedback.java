	package com.airlinereservationsystem.main.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;



@Entity
public class Feedback {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String text;
	private float rating;
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
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public float getRating() {
		return rating;
	}
	public void setRating(float rating) {
		this.rating = rating;
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
		return "Feedback [id=" + id + ", text=" + text + ", rating=" + rating + ", date=" + date + ", flight=" + flight
				+ ", customer=" + customer + "]";
	}
	
	
}
