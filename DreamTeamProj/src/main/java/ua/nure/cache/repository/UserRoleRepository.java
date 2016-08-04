package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.UserRole;

public interface UserRoleRepository extends CrudRepository<UserRole, Long> {
}
