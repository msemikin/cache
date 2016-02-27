package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.entity.Project;

import java.util.Collection;

@Service
@Transactional
public class ProjectsServiceImpl extends GenericServiceImpl<Project> implements ProjectsService {

	private final DAOFactory daoFactory;

	@Autowired
	public ProjectsServiceImpl(final DAOFactory daoFactory) {
		super(daoFactory.getProjectDAO());
		this.daoFactory = daoFactory;
	}

	@Override
	public Collection<Project> getUserProjects(final String email) {
		final int userId = daoFactory.getUserDAO().findUserByEmail(email).getId();
		return daoFactory.getProjectDAO().getProjectsByUser(userId);
	}

}
