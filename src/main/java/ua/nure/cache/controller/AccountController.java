package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.cache.entity.User;
import ua.nure.cache.repository.UserRepository;

import java.security.Principal;

@RestController
public class AccountController {

    private final UserRepository repository;

    @Autowired
    public AccountController(UserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/account", method = RequestMethod.GET)
    public User account(final Principal principal) {
        return repository.findUserByEmail(principal.getName());
    }
}
