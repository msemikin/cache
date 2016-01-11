package ua.nure.cache.dao.hibernate;

import org.hibernate.SessionFactory;
import ua.nure.cache.dao.ElementDAO;
import ua.nure.cache.entity.Element;

public class HibernateElementDAO extends HibernateProjectDependentEntityDAO<Element> implements ElementDAO {

    public HibernateElementDAO(final SessionFactory sessionFactory) {
        super(Element.class, sessionFactory);
    }

}
