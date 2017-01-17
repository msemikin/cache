package ua.nure.cache.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import ua.nure.cache.entity.Project;

@PreAuthorize("hasRole('USER')")
public interface ProjectRepository extends CrudRepository<Project, Integer> {

    @Override
    @Query("select project from Project project where project.owner.email = ?#{principal.username}")
    Iterable<Project> findAll();

    @Override
    @RestResource(exported = false)
    Project save(Project project);
}
