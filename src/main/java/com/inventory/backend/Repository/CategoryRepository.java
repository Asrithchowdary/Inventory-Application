package com.inventory.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{
	

}
