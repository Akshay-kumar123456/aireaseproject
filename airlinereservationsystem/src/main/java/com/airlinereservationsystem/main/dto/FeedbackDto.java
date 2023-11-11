package com.airlinereservationsystem.main.dto;

import java.time.LocalDate;

public class FeedbackDto {

	
	private String text;
	private float rating;
	private LocalDate date;
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
	@Override
	public String toString() {
		return "FeedbackDto [text=" + text + ", rating=" + rating + ", date=" + date + "]";
	}
	
}
