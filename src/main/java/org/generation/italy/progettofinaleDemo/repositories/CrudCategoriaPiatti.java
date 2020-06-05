package org.generation.italy.progettofinaleDemo.repositories;

import org.generation.italy.progettofinaleDemo.entities.CategoriaPiatti;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrudCategoriaPiatti extends CrudRepository<CategoriaPiatti, Integer> {

}
