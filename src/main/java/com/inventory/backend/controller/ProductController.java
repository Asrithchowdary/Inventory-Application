package com.inventory.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inventory.backend.dto.ProductRequestDTO;
import com.inventory.backend.dto.ProductResponseDTO;
import com.inventory.backend.service.ProductService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
	private final ProductService productService;
	
	@PostMapping
	public ProductResponseDTO create(@RequestBody ProductRequestDTO dto) {
		return productService.createProduct(dto);
	}
	
	@GetMapping
	public List<ProductResponseDTO> getAll(){
		return productService.getAllProducts();
	}
	
	@GetMapping("{id}")
	public ProductResponseDTO getById(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	
	@PutMapping("{id}")
	public ProductResponseDTO update(
			@PathVariable Long id,
			@RequestBody ProductRequestDTO dto
			) {
		return productService.updateProduct(id, dto);
	}
	
	@DeleteMapping("{id}")
	public String delete(@PathVariable Long id) {
		productService.deleteProduct(id);
		return "Product deleted Successfully";
	}
}
