package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.entity.User;
import ua.nure.cache.entity.UserRole;
import ua.nure.cache.entity.UserRoles;
import ua.nure.cache.exception.AccountException;
import ua.nure.cache.repository.UserRepository;

@Service
@Transactional
public class AccountService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(final UserRepository userRepository,
                          final PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerStudent(final User user) {
        UserRole role = new UserRole(UserRoles.STUDENT.toRole(), user);
        user.getRoles().add(role);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new AccountException("Email not available");
        }
        return userRepository.save(user);
    }

}
