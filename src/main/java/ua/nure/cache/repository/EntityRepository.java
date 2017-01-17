package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Entity;

import java.util.stream.Stream;

public interface EntityRepository extends CrudRepository<Entity, Integer> {

}
