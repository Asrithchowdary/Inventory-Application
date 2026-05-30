package com.inventory.backend.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "transcations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transcation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer totalProducts;
	
	private BigDecimal totalPrice;
	
	@Enumerated(EnumType.STRING)
	private TranscationType type;
	
	@Enumerated(EnumType.STRING)
	private TransactionStatus status;
	
	private String description;
	
	private String note;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	
	@ManyToOne
	@JoinColumn(name ="user_id")
	private User user;
	
	
	@ManyToOne
	@JoinColumn(name="supplier_id")
	private Supplier supplier;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	

}
