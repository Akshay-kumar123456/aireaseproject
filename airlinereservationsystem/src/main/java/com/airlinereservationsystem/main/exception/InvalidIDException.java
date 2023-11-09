package com.airlinereservationsystem.main.exception;

public class InvalidIDException extends Exception {

	private static final long serialVersionUID = -562934416888787124L;
	
	private String message;

	public InvalidIDException(String message) {
		
		this.message = message;
	}

	public String getMessage() {
		return message;
	}
	
	

}
