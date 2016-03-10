package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Entity;
import ua.nure.cache.service.*;

import java.util.Collection;

@RestController
@RequestMapping("/projects/{projectId}/entities")
public class EntitiesController {

	private final EntitiesService entitiesServiceImpl;

	@Autowired
	public EntitiesController(final EntitiesService entitiesServiceImpl) {
		this.entitiesServiceImpl = entitiesServiceImpl;
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	Collection<Entity> getEntities(@PathVariable("projectId") final int projectId) {
		return entitiesServiceImpl.getByProject(projectId);
	}

	@RequestMapping(value = "", method = RequestMethod.POST)
	Entity createEntity(@RequestBody final Entity entity, @PathVariable("projectId") final int projectId) {
		return entitiesServiceImpl.create(entity);
	}

	@RequestMapping(value = "/{entityId}", method = RequestMethod.GET)
	Entity getEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId) {
		return entitiesServiceImpl.getByProject(projectId, entityId);
	}

	@RequestMapping(value = "/{entityId}", method = RequestMethod.DELETE)
	void deleteEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId) {
		entitiesServiceImpl.delete(entityId);
	}

	@RequestMapping(value = "/{entityId}", method = RequestMethod.PUT)
	Entity updateEntity(@PathVariable("projectId") final int projectId, @PathVariable("entityId") final int entityId,
			@RequestBody final Entity entity) {
		return entitiesServiceImpl.update(entity);
	}
}
