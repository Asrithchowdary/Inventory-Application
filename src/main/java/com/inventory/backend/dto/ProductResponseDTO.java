package com.inventory.backend.dto;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductResponseDTO {
	
	private Long id;
	private String name;
	private String sku;
	private BigDecimal price;
	private Integer stockQuantity;
	private String description;
	private String CategoryName;

}
