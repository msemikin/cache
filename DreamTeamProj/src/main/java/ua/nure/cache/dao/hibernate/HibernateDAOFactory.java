package ua.nure.cache.dao.hibernate;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;

@Component
public class HibernateDAOFactory implements DAOFactory {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public <T> DAO<T> getDAO(Class<T> classInstance) {
        return new HibernateDAO<>(classInstance, sessionFactory);
    }

    @Override
    public UserDAO getUserDAO() {
        return new HibernateUserDAO(sessionFactory);
    }

    @Override
    public ElementDAO getElementDAO() {
        return new HibernateElementDAO(sessionFactory);
    }

    @Override
    public InfReqDAO getInfReqDAO() {
        return new HibernateInfReqDAO(this.sessionFactory);
    }

    @Override
    public <T> ProjectDependentEntityDAO<T> getProjectDependentDAO(Class<T> classInstance) {
        return new HibernateProjectDependentEntityDAO<>(classInstance, this.sessionFactory);
    }


}
