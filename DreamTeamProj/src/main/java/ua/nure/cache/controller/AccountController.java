package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.cache.entity.User;
import ua.nure.cache.service.AccountService;

import java.security.Principal;

@RestController
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/account/student/register", method = RequestMethod.POST)
    public User registerUser(final User user) {
        return this.accountService.registerStudent(user);
    }

    @RequestMapping(value = "/account", method = RequestMethod.POST)
    public User account(final Principal principal) {
        return this.accountService.getUserByEmail(principal.getName());
    }
}
