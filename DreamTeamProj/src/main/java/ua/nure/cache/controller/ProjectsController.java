package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Project;
import ua.nure.cache.repository.ProjectRepository;
import ua.nure.cache.repository.UserRepository;

import java.security.Principal;
import java.util.Collection;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/projects")
public class ProjectsController {

	private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @Autowired
	public ProjectsController(ProjectRepository projectRepository, UserRepository userRepository) {
		this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Project> getProjects(Principal principal) {
		return projectRepository.findByOwnerEmail(principal.getName()).collect(Collectors.toList());
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public void createProject(final @RequestBody Project project, final Principal principal) {
	    project.setOwner(userRepository.findUserByEmail(principal.getName()));
		projectRepository.save(project);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteProject(final @PathVariable(value = "id") Long id) {
	    projectRepository.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateProject(final @RequestBody Project project, final @PathVariable(value = "id") int id) {
	    projectRepository.save(project);
	}

}
