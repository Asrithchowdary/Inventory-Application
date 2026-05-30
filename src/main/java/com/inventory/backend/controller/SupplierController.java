package com.inventory.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.backend.Repository.SupplierRepository;
import com.inventory.backend.entity.Supplier;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/suppliers")
@RequiredArgsConstructor
public class SupplierController {
	
	private final SupplierRepository supplierRepository;
	
	@PostMapping
	public Supplier create(@RequestBody Supplier supplier) {
		return supplierRepository.save(supplier);
	}
	
	@GetMapping
	public List<Supplier> getAll(){
		return supplierRepository.findAll();
	}
	
	@DeleteMapping("{id}")
	public String delete(@PathVariable Long id) {
		supplierRepository.deleteById(id);
		return "Suppliere deleted";
	}

}
