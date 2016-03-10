package ua.nure.cache.dao.hibernate;

import org.apache.poi.ss.formula.functions.T;
import org.hibernate.*;
import org.hibernate.criterion.Restrictions;
import ua.nure.cache.dao.*;
import ua.nure.cache.entity.Entity;

import java.util.List;
public class HibernateEntitiesDAO extends HibernateProjectDependentEntityDAO<Entity> implements EntitiesDAO {

	public HibernateEntitiesDAO(final SessionFactory sessionFactory) {
		super(Entity.class, sessionFactory);
	}

	@Override
	public List<Entity> getByProject(final int projectId) {
		return this.getSession().createCriteria(Entity.class)
				.setFetchMode("attrs", FetchMode.JOIN)
				.add(Restrictions.eq("projectId", projectId))
				.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
				.list();
	}
}
