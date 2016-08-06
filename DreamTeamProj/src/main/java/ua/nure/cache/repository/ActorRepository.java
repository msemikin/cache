package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Actor;

public interface ActorRepository extends CrudRepository<Actor, Integer> {
}
