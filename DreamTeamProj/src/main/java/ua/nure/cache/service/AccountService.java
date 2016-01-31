package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.UserDAO;
import ua.nure.cache.entity.User;
import ua.nure.cache.entity.UserRole;
import ua.nure.cache.entity.UserRoles;
import ua.nure.cache.exception.AccountException;

@Service
@Transactional
public class AccountService {

    private final DAOFactory daoFactory;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(final DAOFactory daoFactory,
            final PasswordEncoder passwordEncoder) {
        this.daoFactory = daoFactory;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerStudent(final User user) {
        UserRole role = new UserRole(UserRoles.STUDENT.toRole(), user);
        user.getRoles().add(role);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

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
