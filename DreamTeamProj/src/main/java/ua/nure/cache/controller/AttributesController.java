package ua.nure.cache.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ua.nure.cache.entity.Attribute;
import ua.nure.cache.service.*;

@RestController
@RequestMapping(value = "/projects/{projectId}/objects/{objectId}/attrs")
public class AttributesController {

	private final AttributesService attributesService;

	@Autowired
	public AttributesController(final AttributesService attributesService) {
		this.attributesService = attributesService;
	}

	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Attribute addAttribute(@RequestBody final Attribute attribute, @PathVariable("objectId") final int objectId) {
		return attributesService.create(attribute);
	}
}
