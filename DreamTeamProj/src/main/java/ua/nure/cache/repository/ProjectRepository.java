package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Project;

import java.util.stream.Stream;

public interface ProjectRepository extends CrudRepository<Project, Long> {

    Stream<Project> findByOwnerEmail(final String email);

}
