package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;
import ua.nure.cache.entity.*;

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

	@Override
	public void create(final Project project, final String ownerEmail) {
		final User owner = daoFactory.getUserDAO().findUserByEmail(ownerEmail);
		project.setOwner(owner);
		this.create(project);
	}
}
