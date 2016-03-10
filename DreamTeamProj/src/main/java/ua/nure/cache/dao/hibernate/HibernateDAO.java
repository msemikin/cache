package ua.nure.cache.dao.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import ua.nure.cache.dao.DAO;

import java.util.List;

public class HibernateDAO<T> implements DAO<T> {

    private final SessionFactory sessionFactory;
    protected final Class<T> classInstance;

    public HibernateDAO(Class<T> classInstance, SessionFactory sessionFactory) {
        this.classInstance = classInstance;
        this.sessionFactory = sessionFactory;
    }

    protected Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public List<T> getAll() {
        return (List<T>) this.getSession().createCriteria(this.classInstance).list();
    }

    @Override
    public T create(T entity) {
        getSession().save(entity);
        return entity;
    }

    @Override
    public T read(int id) {
        return getSession().get(this.classInstance, id);
    }

    @Override
    public T update(T entity) {
        getSession().update(entity);
        return entity;
    }

    @Override
    public void delete(int id) {
        getSession().delete(getSession().get(this.classInstance, id));
    }

    @Override
    public T merge(final T entity) {
        return (T)getSession().merge(entity);
    }
}
