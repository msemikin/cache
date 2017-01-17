package ua.nure.cache.controller;

import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Diagram;

@RestController
public class DiagramsController {

	@RequestMapping(value = "/projects/{projectId}/diagrams/{type}", method = RequestMethod.GET)
	public Diagram getDiagram(@PathVariable("projectId") final int projectId, @PathVariable("type") final String type) {
		return null;
	}

	@RequestMapping(value = "/projects/{projectId}/diagrams/{type}", method = RequestMethod.POST)
	public Diagram createDiagram(@PathVariable("projectId") final int projectId, @PathVariable("type") final String type) {
		return null;
	}

	@RequestMapping(value = "/projects/{projectId}/diagrams/{type}", method = RequestMethod.PUT)
	public Diagram updateDiagram(@RequestBody final Diagram diagram) {
		return null;
	}

	@RequestMapping(value = "/projects/{projectId}/diagrams/{type}", method = RequestMethod.DELETE)
	public void deleteDiagram(@PathVariable("projectId") final int projectId, @PathVariable("type") final String type) {
	}
}
