package org.generation.italy.progettofinaleDemo.controller;

import org.generation.italy.progettofinaleDemo.auth.Utente;
import org.generation.italy.progettofinaleDemo.auth.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("utenti")
public class UtentiController {

	@Autowired
	private UtenteRepository db;
	
	@GetMapping
	public Iterable<Utente> get(){
		return db.findAll();
	}
}
