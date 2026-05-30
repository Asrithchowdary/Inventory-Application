package com.inventory.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.inventory.backend.Repository.CategoryRepository;
import com.inventory.backend.Repository.ProductRepository;
import com.inventory.backend.dto.ProductRequestDTO;
import com.inventory.backend.dto.ProductResponseDTO;
import com.inventory.backend.entity.Category;
import com.inventory.backend.entity.Product;
import com.inventory.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    
    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        Product product = Product.builder()
                .name(dto.getName())
                .sku(dto.getSku())
                .price(dto.getPrice())
                .stockQuantity(dto.getStockQuantity())
                .description(dto.getDescription())
                .category(category)
                .build();

        Product savedProduct = productRepository.save(product);

        return mapToDTO(savedProduct);
    }

    
    @Override
    public List<ProductResponseDTO> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    
    @Override
    public ProductResponseDTO getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + id));

        return mapToDTO(product);
    }

    
    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto) {

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found with id: " + id));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Category not found with id: " + dto.getCategoryId()));

        existingProduct.setName(dto.getName());
        existingProduct.setSku(dto.getSku());
        existingProduct.setPrice(dto.getPrice());
        existingProduct.setStockQuantity(dto.getStockQuantity());
        existingProduct.setDescription(dto.getDescription());
        existingProduct.setCategory(category);

        Product updatedProduct = productRepository.save(existingProduct);

        return mapToDTO(updatedProduct);
    }

   
    @Override
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }

        productRepository.deleteById(id);
    }

   
    private ProductResponseDTO mapToDTO(Product product) {

        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .description(product.getDescription())
                .CategoryName(
                        product.getCategory() != null
                                ? product.getCategory().getName()
                                : null
                )
                .build();
    }

	
}