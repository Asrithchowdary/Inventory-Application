package com.inventory.backend.dto;

import java.math.BigDecimal;
import lombok.Data;

@Data
public class ProductRequestDTO {
	
	private String name;
	private String sku;
	private BigDecimal price;
	private Integer stockQuantity;
	private String description;
	private Long categoryId;

}
