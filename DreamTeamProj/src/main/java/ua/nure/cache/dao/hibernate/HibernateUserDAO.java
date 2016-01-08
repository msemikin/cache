package ua.nure.cache.dao.hibernate;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import ua.nure.cache.dao.UserDAO;
import ua.nure.cache.entity.User;

public class HibernateUserDAO extends HibernateDAO<User> implements UserDAO {

    public HibernateUserDAO(SessionFactory sessionFactory) {
        super(User.class, sessionFactory);
    }

    @Override
    public User findUserByEmail(String email) {
        Session session = getSession();
        Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq("email", email));
        return (User) criteria.uniqueResult();
    }

    @Override
    public boolean emailAvailable(String email) {
        return this.findUserByEmail(email) == null;
    }
}
