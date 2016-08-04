package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Link;
import ua.nure.cache.entity.Project;

public interface LinkRepository extends
        CrudRepository<Link, Long>,
        ProjectDependentRepository<Link> {
}
