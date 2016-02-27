package ua.nure.cache.dao.hibernate;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import ua.nure.cache.dao.ProjectDAO;
import ua.nure.cache.entity.Project;
import java.util.Collection;

public class HibernateProjectDAO extends HibernateDAO<Project> implements ProjectDAO {

	public HibernateProjectDAO(final SessionFactory sessionFactory) {
		super(Project.class, sessionFactory);
	}

	@Override
	public Collection<Project> getProjectsByUser(final int userId) {
		return this.getSession()
				.createCriteria(this.classInstance)
				.add(Restrictions.eq("owner.id", userId))
				.list();
	}
}
