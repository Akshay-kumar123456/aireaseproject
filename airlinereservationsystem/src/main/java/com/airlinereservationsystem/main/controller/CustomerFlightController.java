package com.airlinereservationsystem.main.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerFlightController {
	@PostMapping("/airease/book/{cid}/{fid}")
	public void bookTicket(@PathVariable("cid")int cid ,@PathVariable("fid")int fid) {
		
	}

}
