package com.inventory.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.backend.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier,Long> {


}
