package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;
import ua.nure.cache.entity.Attribute;

@Service
@Transactional
public class AttributesServiceImpl extends GenericServiceImpl<Attribute> implements AttributesService {

	@Autowired
	public AttributesServiceImpl(final DAOFactory daoFactory) {
		super(daoFactory.getDAO(Attribute.class));
	}
}
