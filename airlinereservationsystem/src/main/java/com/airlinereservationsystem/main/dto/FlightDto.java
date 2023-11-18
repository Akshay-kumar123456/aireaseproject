package com.airlinereservationsystem.main.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class FlightDto {
	
	
	private String code;
	private LocalTime departureTime;
	private LocalDate departureDate;
	private LocalDate arrivalDate;
    public int getAvailableSeats() {
		return availableSeats;
	}
	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}
	private int availableSeats;
    private double economyClassPrice;
    private double firstClassPrice;
    private double businessClassPrice;
    private String source;
    private String destination;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public LocalTime getDepartureTime() {
		return departureTime;
	}
	public void setDepartureTime(LocalTime departureTime) {
		this.departureTime = departureTime;
	}
	public LocalDate getDepartureDate() {
		return departureDate;
	}
	public void setDepartureDate(LocalDate departureDate) {
		this.departureDate = departureDate;
	}
	public LocalDate getArrivalDate() {
		return arrivalDate;
	}
	public void setArrivalDate(LocalDate arrivalDate) {
		this.arrivalDate = arrivalDate;
	}
	
	public double getEconomyClassPrice() {
		return economyClassPrice;
	}
	public void setEconomyClassPrice(double economyClassPrice) {
		this.economyClassPrice = economyClassPrice;
	}
	public double getFirstClassPrice() {
		return firstClassPrice;
	}
	public void setFirstClassPrice(double firstClassPrice) {
		this.firstClassPrice = firstClassPrice;
	}
	public double getBusinessClassPrice() {
		return businessClassPrice;
	}
	public void setBusinessClassPrice(double businessClassPrice) {
		this.businessClassPrice = businessClassPrice;
	}
	public String getSource() {
		return source;
	}
	public void setSource(String source) {
		this.source = source;
	}
	public String getDestination() {
		return destination;
	}
	public void setDestination(String destination) {
		this.destination = destination;
	}
	@Override
	public String toString() {
		return "FlightDto [code=" + code + ", departureTime=" + departureTime + ", departureDate=" + departureDate
				+ ", arrivalDate=" + arrivalDate + ", availableSeats=" + availableSeats + ", economyClassPrice="
				+ economyClassPrice + ", firstClassPrice=" + firstClassPrice + ", businessClassPrice="
				+ businessClassPrice + ", source=" + source + ", destination=" + destination + "]";
	}
    
    

}