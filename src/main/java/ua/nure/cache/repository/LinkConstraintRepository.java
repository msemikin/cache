package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.LinkConstraint;

public interface LinkConstraintRepository extends
        CrudRepository<LinkConstraint, Integer> {
}
