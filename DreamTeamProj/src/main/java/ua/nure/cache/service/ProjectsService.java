package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.entity.Project;

import java.util.Collection;

@Service
public class ProjectsService {

	private final DAOFactory daoFactory;

	@Autowired
	public ProjectsService(final DAOFactory daoFactory) {
		this.daoFactory = daoFactory;
	}

	public Collection<Project> getUserProjects(final String email) {
		final int userId = daoFactory.getUserDAO().findUserByEmail(email).getId();
		return daoFactory.getProjectDAO().getProjectsByUser(userId);
	}
}
