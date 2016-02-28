package ua.nure.cache.service;

import ua.nure.cache.entity.Project;

import java.util.Collection;
public interface ProjectsService extends GenericService<Project> {

	void create(final Project project, final String ownerEmail);

	Collection<Project> getUserProjects(final String email);

}
