package com.inventory.backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.backend.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long>{
	Optional<Product> findBySku(String sku);

}
