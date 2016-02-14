package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Project;
import ua.nure.cache.service.ProjectsService;

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
}
