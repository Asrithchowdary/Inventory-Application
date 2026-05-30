package com.inventory.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.backend.service.RazorpayService;

@RestController
@RequestMapping("api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
	
	@Autowired
	private RazorpayService razorpayService;
	
	@PostMapping("/create-order")
	public String createOrder(
			@RequestParam int amount,
			@RequestParam String currency) {
		
		try {
			return razorpayService.createOrder(amount, currency, "receipt_"+System.currentTimeMillis());
			
		}
		catch(Exception e) {
			throw new RuntimeException(e);
		}
	}
}
