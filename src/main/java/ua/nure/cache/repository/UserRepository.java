package ua.nure.cache.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import ua.nure.cache.entity.User;

@PreAuthorize("hasRole('ROLE_ADMIN')")
public interface UserRepository extends CrudRepository<User, Integer> {
    User findUserByEmail(String email);

    @Query("select count(u) > 0 from User u where u.email = ?1")
    boolean existsByEmail(String email);

    @Override
    @PreAuthorize("permitAll")
    User save(User user);
}
