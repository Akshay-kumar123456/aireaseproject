package com.airlinereservationsystem.main.model;


import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.airlinereservationsystem.main.enums.Seatclass;
import com.airlinereservationsystem.main.enums.Status;



@Entity
public class Seat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String seatNo;
	@Enumerated(EnumType.STRING)
	private Status status;
	@Enumerated(EnumType.STRING)
	private Seatclass seatclass;
	@ManyToOne
	private Flight flight;
	
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSeatNo() {
		return seatNo;
	}

	public void setSeatNo(String seatNo) {
		this.seatNo = seatNo;
	}

	public Seatclass getSeatclass() {
		return seatclass;
	}

	public void setSeatclass(Seatclass seatclass) {
		this.seatclass = seatclass;
	}

	
	

	
   
	@Override
	public String toString() {
		return "Seat [id=" + id + ", seatNo=" + seatNo + ", status=" + status + ", seatclass=" + seatclass + ", flight="
				+ flight + "]";
	}
	

}
