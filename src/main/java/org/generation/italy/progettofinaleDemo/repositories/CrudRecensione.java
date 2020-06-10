package org.generation.italy.progettofinaleDemo.repositories;

import java.util.List;

import org.generation.italy.progettofinaleDemo.entities.Recensione;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudRecensione extends CrudRepository<Recensione, Integer> {

	List<Recensione> findByRistorante_Id(int idRistorante);
}
