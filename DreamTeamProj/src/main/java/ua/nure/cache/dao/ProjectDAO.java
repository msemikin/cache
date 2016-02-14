package ua.nure.cache.dao;

import ua.nure.cache.entity.Project;

import java.util.Collection;

public interface ProjectDAO extends DAO<Project> {

	Collection<Project> getProjectsByUser(final int userId);

}
