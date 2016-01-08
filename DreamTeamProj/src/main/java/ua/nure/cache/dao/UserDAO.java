package ua.nure.cache.dao;

import ua.nure.cache.entity.User;

public interface UserDAO extends DAO<User> {

    User findUserByEmail(final String email);

    boolean emailAvailable(final String email);

}
