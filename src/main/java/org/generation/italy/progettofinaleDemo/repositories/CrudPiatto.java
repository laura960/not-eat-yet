package org.generation.italy.progettofinaleDemo.repositories;

import java.util.List;

import org.generation.italy.progettofinaleDemo.entities.Piatto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudPiatto extends CrudRepository<Piatto, Integer> {

	List<Piatto> findByRistorante_Id(int idRistorante);
}
