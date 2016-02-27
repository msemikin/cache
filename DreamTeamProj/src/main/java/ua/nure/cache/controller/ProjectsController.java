package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Project;
import ua.nure.cache.service.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping(value = "/projects")
public class ProjectsController {

	private final ProjectsService projectsService;

	@Autowired
	public ProjectsController(final ProjectsService projectsService) {
		this.projectsService = projectsService;
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public Collection<Project> getProjects(Principal principal) {
		return this.projectsService.getUserProjects(principal.getName());
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	public void createProject(final @RequestBody Project project) {
		this.projectsService.create(project);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteProject(final @PathVariable(value = "id") int id) {
		this.projectsService.delete(id);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void updateProject(final @RequestBody Project project, final @PathVariable(value = "id") int id) {
		this.projectsService.update(project);
	}

}
