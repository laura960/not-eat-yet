package org.generation.italy.progettofinaleDemo.repositories;

import java.util.List;

import org.generation.italy.progettofinaleDemo.entities.Risposta;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudRisposta extends CrudRepository<Risposta, Integer> {

	List<Risposta> findByRecensione_Id(int idRecensione);
}
