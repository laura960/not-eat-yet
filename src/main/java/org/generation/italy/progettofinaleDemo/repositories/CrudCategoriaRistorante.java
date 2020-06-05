package org.generation.italy.progettofinaleDemo.repositories;

import org.generation.italy.progettofinaleDemo.entities.CategoriaRistorante;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudCategoriaRistorante extends CrudRepository<CategoriaRistorante, Integer> {

}
