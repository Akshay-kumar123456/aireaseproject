package com.airlinereservationsystem.main.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.airlinereservationsystem.main.enums.Seatclass;





@Entity
public class CustomerFlight {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private int age;
	private String gender;
	private String seatNumber;
	private LocalDate date;
	private double price;
	@Enumerated(EnumType.STRING)
	private Seatclass seatclass;
	@ManyToOne
	private Flight flight;
	@ManyToOne
	private Customer customer;
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
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
	public Seatclass getSeatclass() {
		return seatclass;
	}
	public void setSeatclass(Seatclass seatclass) {
		this.seatclass = seatclass;
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
		return "CustomerFlight [id=" + id + ", name=" + name + ", age=" + age + ", gender=" + gender + ", seatNumber="
				+ seatNumber + ", date=" + date + ", price=" + price + ", seatclass=" + seatclass + ", flight=" + flight
				+ ", customer=" + customer + "]";
	}
	
	
	
	
}
