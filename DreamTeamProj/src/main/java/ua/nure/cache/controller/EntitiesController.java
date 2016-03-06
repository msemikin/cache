package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Entity;
import ua.nure.cache.service.*;

import java.util.Collection;

@RestController
public class EntitiesController {

	private final EntitiesService entitiesService;

	@Autowired
	public EntitiesController(final EntitiesService entitiesService) {
		this.entitiesService = entitiesService;
	}

	@RequestMapping(value = "/projects/{projectId}/entities", method = RequestMethod.GET)
	Collection<Entity> getEntities(@PathVariable("projectId") final int projectId) {
		return entitiesService.getByProject(projectId);
	}

	@RequestMapping(value = "/projects/{projectId}/entities", method = RequestMethod.POST)
	Entity createEntity(@RequestBody final Entity entity, @PathVariable("projectId") final int projectId) {
		return entitiesService.create(entity);
	}

	@RequestMapping(value = "/projects/{projectId}/entities/{entityId}", method = RequestMethod.GET)
	Entity getEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId) {
		return entitiesService.getByProject(projectId, entityId);
	}

	@RequestMapping(value = "/projects/{projectId}/entities/{entityId}", method = RequestMethod.DELETE)
	void deleteEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId) {
		entitiesService.delete(entityId);
	}

	@RequestMapping(value = "/projects/{projectId}/entities/{entityId}", method = RequestMethod.PUT)
	Entity updateEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId,
			@RequestBody final Entity entity) {
		return entitiesService.update(entity);
	}
}
