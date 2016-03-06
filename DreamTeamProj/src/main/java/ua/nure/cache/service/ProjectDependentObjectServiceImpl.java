package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;

import java.util.Collection;

public class ProjectDependentObjectServiceImpl<T> extends GenericServiceImpl<T> implements ProjectDependentObjectService<T> {

	private final DAOFactory daoFactory;
	private final Class<T> classInstance;

	public ProjectDependentObjectServiceImpl(Class<T> instance, final DAOFactory daoFactory) {
		super(daoFactory.getProjectDependentDAO(instance));
		this.classInstance = instance;
		this.daoFactory = daoFactory;
	}

	@Override
	public Collection<T> getByProject(final int projectId) {
		return daoFactory.getProjectDependentDAO(classInstance).getByProject(projectId);
	}

	@Override
	public T getByProject(final int projectId, final int id) {
		return daoFactory.getProjectDependentDAO(classInstance).getByProject(projectId, id);
	}
}
