package ua.nure.cache.service;

import java.util.Collection;

public interface ProjectDependentObjectService<T> extends GenericService<T> {

	Collection<T> getByProject(final int projectId);

	T getByProject(final int projectId, final int id);

}
