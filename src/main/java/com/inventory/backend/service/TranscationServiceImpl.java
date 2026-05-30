package com.inventory.backend.service;

import org.springframework.stereotype.Service;
import com.inventory.backend.Repository.ProductRepository;
import com.inventory.backend.Repository.TranscationRepository;
import com.inventory.backend.entity.Product;
import com.inventory.backend.entity.TransactionStatus;
import com.inventory.backend.entity.Transcation;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TranscationServiceImpl implements TranscationService{
	
	private final TranscationRepository transcationRepository;
	private final ProductRepository productRepository;

	@Override
	public Transcation createTranscation(Transcation transcation) {
		Product product = productRepository.findById(transcation.getProduct().getId()).orElseThrow(() -> new RuntimeException("Product not found"));
		
		int qty = transcation.getTotalProducts();
		
		switch(transcation.getType()) {
		case PURCHASE -> product.setStockQuantity
		(product.getStockQuantity() +qty);
		
		case SELL -> {
			if(product.getStockQuantity() < qty) {
				throw new RuntimeException("Not enough stock");
			}
			product.setStockQuantity(
					product.getStockQuantity() -qty);
		}
		case RETURN -> product.setStockQuantity(
				product.getStockQuantity()+qty);
		}
		
		productRepository.save(product);
		
		transcation.setStatus(TransactionStatus.COMPLETED);
		
		return transcationRepository.save(transcation);
	}
	

}
