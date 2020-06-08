package org.generation.italy.progettofinaleDemo.controller;

import java.util.List;
import java.util.Optional;

import org.generation.italy.progettofinaleDemo.entities.Piatto;
import org.generation.italy.progettofinaleDemo.repositories.CrudPiatto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
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
@RequestMapping("/piatti")
public class PiattiController {

	@Autowired
	private CrudPiatto db;
	
	@GetMapping
	public Iterable<Piatto> get(@RequestParam(defaultValue = "0") int idRistorante){
		if (idRistorante > 0)
			return db.findByRistorante_Id(idRistorante);
		
		return db.findAll();
	}
	
//	@Query("SELECT * FROM piatti WHERE id_ristorante = ?1;")
//	List<Piatto> findByIdRistorante(int idRistorante);
	
	@GetMapping("/{id}")
	public Optional<Piatto> getPiatto(@PathVariable int id){
		return db.findById(id);
	}
	
	
	@PostMapping
	public void add(@RequestBody Piatto piatto) {
		if(piatto.getId() == 0)
			db.save(piatto);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable int id) {
		db.deleteById(id);
	}
	
	@PutMapping
	public void update(@RequestBody Piatto piatto){
		if(db.findById(piatto.getId()).isPresent())
			db.save(piatto);
	}
}
