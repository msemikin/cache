package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Attribute;
import ua.nure.cache.service.AttributesService;

@RestController
@RequestMapping("/projects/{projectId}/entities/{entityId}/attributes")
public class AttributesController {

	private final AttributesService attributesService;

	@Autowired
	public AttributesController(final AttributesService attributesService) {
		this.attributesService = attributesService;
	}

}
