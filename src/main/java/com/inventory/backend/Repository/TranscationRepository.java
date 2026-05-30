package com.inventory.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.backend.entity.Transcation;

public interface TranscationRepository extends JpaRepository<Transcation,Long>{

}
