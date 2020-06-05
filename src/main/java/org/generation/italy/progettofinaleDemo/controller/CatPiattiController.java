package org.generation.italy.progettofinaleDemo.controller;

import java.util.Optional;

import org.generation.italy.progettofinaleDemo.entities.CategoriaPiatti;
import org.generation.italy.progettofinaleDemo.repositories.CrudCategoriaPiatti;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categorie-piatti")
public class CatPiattiController {

	@Autowired
	private CrudCategoriaPiatti db;
	

	@GetMapping
	public Iterable<CategoriaPiatti> get(){
		return db.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<CategoriaPiatti> get(@PathVariable int id){
		return db.findById(id);
	}
	
	@PostMapping
	public void add(@RequestBody CategoriaPiatti cr) {
		if(cr.getId() == 0)
			db.save(cr);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		db.deleteById(id);
	}
	
	@PutMapping
	public void update(@RequestBody CategoriaPiatti cr){
		if(db.findById(cr.getId()).isPresent())
			db.save(cr);
	}
}
