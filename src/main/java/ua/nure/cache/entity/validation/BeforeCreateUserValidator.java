package ua.nure.cache.entity.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ua.nure.cache.entity.User;
import ua.nure.cache.repository.UserRepository;

@Component("beforeCreateUserValidator")
public class BeforeCreateUserValidator implements Validator {

    private final UserRepository userRepository;

    @Autowired
    public BeforeCreateUserValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(User.class);
    }

    @Override
    public void validate(Object o, Errors errors) {
        final User user = (User) o;
        if (userRepository.existsByEmail(user.getEmail())) {
            errors.rejectValue("email", "Email already occupied");
        }
    }
}
