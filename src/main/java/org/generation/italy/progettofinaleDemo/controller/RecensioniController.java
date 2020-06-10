package org.generation.italy.progettofinaleDemo.controller;

import java.util.Optional;

import org.generation.italy.progettofinaleDemo.entities.Piatto;
import org.generation.italy.progettofinaleDemo.entities.Recensione;
import org.generation.italy.progettofinaleDemo.repositories.CrudRecensione;
import org.springframework.beans.factory.annotation.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recensioni")
public class RecensioniController {

	@Autowired
	private CrudRecensione db;
	
	@GetMapping
	public Iterable<Recensione> get(@RequestParam(defaultValue = "0") int idRistorante){
		if (idRistorante > 0)
			return db.findByRistorante_Id(idRistorante);
		
		return db.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Recensione> getRecensione(@PathVariable int id){
		return db.findById(id);
	}
	
	
	@PostMapping
	public String add(@RequestBody Recensione r) {
		if(r.getId() == 0)
			db.save(r);
		return "{ \"message\": \"Ok\" }";
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		db.deleteById(id);
	}
	
	@PutMapping
	public String update(@RequestBody Recensione r){
		if(db.findById(r.getId()).isPresent())
			db.save(r);
		return "{ \"message\": \"Ok\" }";
	}
	
}
