package ua.nure.cache.dao.hibernate;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import ua.nure.cache.dao.DAO;

public class HibernateDAO<T> implements DAO<T> {

    private final Class<T> classInstance;
    private final SessionFactory sessionFactory;

    public HibernateDAO(Class<T> classInstance, SessionFactory sessionFactory) {
        this.classInstance = classInstance;
        this.sessionFactory = sessionFactory;
    }

    protected Session getSession() {
        return this.sessionFactory.getCurrentSession();
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
    public void delete(T entity) {
        getSession().delete(entity);
    }

}
