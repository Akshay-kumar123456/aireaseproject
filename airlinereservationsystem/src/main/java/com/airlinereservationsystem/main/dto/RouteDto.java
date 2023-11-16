package com.airlinereservationsystem.main.dto;

public class RouteDto {

	private int id;
	private String departureCity;
	private String arrivalCity;
	private double distance;
	private double duration;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDepartureCity() {
		return departureCity;
	}
	public void setDepartureCity(String departureCity) {
		this.departureCity = departureCity;
	}
	public String getArrivalCity() {
		return arrivalCity;
	}
	public void setArrivalCity(String arrivalCity) {
		this.arrivalCity = arrivalCity;
	}
	public double getDistance() {
		return distance;
	}
	public void setDistance(double distance) {
		this.distance = distance;
	}
	public double getDuration() {
		return duration;
	}
	public void setDuration(double duration) {
		this.duration = duration;
	}
	@Override
	public String toString() {
		return "RouteDto [id=" + id + ", departureCity=" + departureCity + ", arrivalCity=" + arrivalCity
				+ ", distance=" + distance + ", duration=" + duration + "]";
	}
	
}
