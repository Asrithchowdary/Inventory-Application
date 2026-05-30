package com.inventory.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.backend.Repository.CategoryRepository;
import com.inventory.backend.entity.Category;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
	
	private final CategoryRepository categoryRepository;
	
	@PostMapping
	public Category create(@RequestBody Category category) {
		return categoryRepository.save(category);
	}
	
	@GetMapping
	public List<Category>getAll(){
		return categoryRepository.findAll();
	}
	
	@DeleteMapping("/{id}")
	public String delete(@PathVariable Long id) {
		categoryRepository.deleteById(id);
		return "Category deleted";
	}

}
