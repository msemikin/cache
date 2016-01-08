package ua.nure.cache.dao.hibernate;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.UserDAO;

public class HibernateDAOFactory extends DAOFactory {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public UserDAO getUserDAO() {
        return new HibernateUserDAO(sessionFactory);
    }
}
