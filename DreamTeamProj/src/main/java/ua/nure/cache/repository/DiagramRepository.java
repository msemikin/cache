package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Diagram;

public interface DiagramRepository extends CrudRepository<Diagram, Long>, ProjectDependentRepository<Diagram> {
}
