package ua.nure.cache.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findUserByEmail(String email);

    @Query("select count(u) > 0 from User u where u.email = ?1")
    boolean existsByEmail(String email);
}
