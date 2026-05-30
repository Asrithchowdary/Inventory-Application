package com.inventory.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inventory.backend.entity.Transcation;
import com.inventory.backend.service.TranscationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transcations")
@RequiredArgsConstructor
public class TranscationController {
	
	private final TranscationService transcationService;
	
	@PostMapping
	public Transcation create(@RequestBody Transcation transcation) {
		return transcationService.createTranscation(transcation);
	}

}
