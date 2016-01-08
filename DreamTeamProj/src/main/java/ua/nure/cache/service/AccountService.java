package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.UserDAO;
import ua.nure.cache.entity.User;
import ua.nure.cache.entity.UserRole;
import ua.nure.cache.entity.UserRoles;
import ua.nure.cache.exception.AccountException;

public class AccountService {

    @Autowired
    private DAOFactory daoFactory;

    public User registerStudent(final User user) {
        UserRole role = new UserRole(UserRoles.STUDENT.toRole(), user);
        user.getRoles().add(role);

        final UserDAO userDAO = this.daoFactory.getUserDAO();
        if (!userDAO.emailAvailable(user.getEmail())) {
            throw new AccountException("Email not available");
        }
        return userDAO.create(user);
    }

    public User getUserByEmail(final String email) {
        return this.daoFactory.getUserDAO().findUserByEmail(email);
    }

}
