package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ua.nure.cache.entity.Project;
import ua.nure.cache.entity.User;
import ua.nure.cache.repository.ProjectRepository;
import ua.nure.cache.repository.UserRepository;

import java.security.Principal;

@RestController
@RequestMapping("/projects")
public class ProjectsController {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProjectsController(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void createProject(@RequestBody final Project project, final Principal principal) {
        final User owner = userRepository.findUserByEmail(principal.getName());
        project.setOwner(owner);
        projectRepository.save(project);
    }
}
