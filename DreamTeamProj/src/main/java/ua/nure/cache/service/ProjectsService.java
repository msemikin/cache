package ua.nure.cache.service;

import ua.nure.cache.entity.Project;

import java.util.Collection;
public interface ProjectsService extends GenericService<Project> {

	Collection<Project> getUserProjects(final String email);

}
