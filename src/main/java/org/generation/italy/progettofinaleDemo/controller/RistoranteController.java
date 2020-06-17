package org.generation.italy.progettofinaleDemo.controller;

import java.util.Optional;

import org.generation.italy.progettofinaleDemo.entities.Ristorante;
import org.generation.italy.progettofinaleDemo.repositories.CrudRistorante;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ristoranti")
public class RistoranteController {

	@Autowired
	private CrudRistorante db;
	

	@GetMapping
	public Iterable<Ristorante> get(@RequestParam(defaultValue = "0") int idUtente){
		if (idUtente > 0)
			return db.findByUtente_Id(idUtente);
		
		return db.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Ristorante> getRistorante(@PathVariable int id){
		return db.findById(id);
	}
	
	@PostMapping
	public String add(@RequestBody Ristorante ristorante) {
		if(ristorante.getId() == 0)
			db.save(ristorante);
		return "{ \"message\": \"Ok\" }";
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		db.deleteById(id);
	}
	
	@PutMapping
	public String update(@RequestBody Ristorante ristorante){
		if(db.findById(ristorante.getId()).isPresent())
			db.save(ristorante);
		return "{ \"message\": \"Ok\" }";
	}
	
}
