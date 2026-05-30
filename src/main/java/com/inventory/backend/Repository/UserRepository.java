package com.inventory.backend.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
	 	Optional<User> findByEmail(String email);

}
