package com.inventory.backend.service;

import java.util.List;

import com.inventory.backend.dto.ProductRequestDTO;
import com.inventory.backend.dto.ProductResponseDTO;
import com.inventory.backend.entity.Product;

public interface ProductService {
	
	ProductResponseDTO createProduct(ProductRequestDTO dto);
	
	List<ProductResponseDTO> getAllProducts();
	
	ProductResponseDTO getProductById(Long id);
	
	ProductResponseDTO updateProduct(Long id,ProductRequestDTO dto);
	
	void deleteProduct(Long id);

}
