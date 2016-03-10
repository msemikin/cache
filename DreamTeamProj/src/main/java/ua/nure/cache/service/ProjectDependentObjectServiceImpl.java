package ua.nure.cache.service;

import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;

import java.util.Collection;

@Transactional
public class ProjectDependentObjectServiceImpl<T> extends GenericServiceImpl<T> implements ProjectDependentObjectService<T> {

	private final ProjectDependentEntityDAO<T> dao;

	public ProjectDependentObjectServiceImpl(final ProjectDependentEntityDAO dao) {
		super(dao);
		this.dao = dao;
	}

	@Override
	public Collection<T> getByProject(final int projectId) {
		return dao.getByProject(projectId);
	}

	@Override
	public T getByProject(final int projectId, final int id) {
		return dao.getByProject(projectId, id);
	}

	public ProjectDependentEntityDAO<T> getDao() {
		return dao;
	}
}
