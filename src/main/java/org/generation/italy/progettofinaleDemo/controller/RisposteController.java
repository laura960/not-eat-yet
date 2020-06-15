package org.generation.italy.progettofinaleDemo.controller;

import java.util.Optional;

import org.generation.italy.progettofinaleDemo.entities.Recensione;
import org.generation.italy.progettofinaleDemo.entities.Risposta;
import org.generation.italy.progettofinaleDemo.repositories.CrudRisposta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/risposte")
public class RisposteController {

	@Autowired
	CrudRisposta db;
	
	@GetMapping
	public Iterable<Risposta> get(@RequestParam(defaultValue = "0") int idRecensione){
		if (idRecensione > 0)
			return db.findByRecensione_Id(idRecensione);
		
		return db.findAll();
	}
	
	@GetMapping("/{id}")
	public Optional<Risposta> getRisposta(@PathVariable int id){
		return db.findById(id);
	}
	
	
	@PostMapping
	public String add(@RequestBody Risposta r) {
		if(r.getId() == 0)
			db.save(r);
		return "{ \"message\": \"Ok\" }";
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		db.deleteById(id);
	}
	
	@PutMapping
	public String update(@RequestBody Risposta r){
		if(db.findById(r.getId()).isPresent())
			db.save(r);
		return "{ \"message\": \"Ok\" }";
	}
}
