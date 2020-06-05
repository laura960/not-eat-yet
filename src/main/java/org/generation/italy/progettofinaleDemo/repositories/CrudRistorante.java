package org.generation.italy.progettofinaleDemo.repositories;

import org.generation.italy.progettofinaleDemo.entities.Ristorante;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudRistorante extends CrudRepository<Ristorante, Integer>{

}
