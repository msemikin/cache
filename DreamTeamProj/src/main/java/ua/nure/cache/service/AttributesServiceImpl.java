package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;
import ua.nure.cache.entity.Attribute;
@Transactional
@Service
public class AttributesServiceImpl extends GenericServiceImpl<Attribute> implements AttributesService {

	private final DAOFactory daoFactory;

	@Autowired
	public AttributesServiceImpl(final DAOFactory daoFactory) {
		super(daoFactory.getDAO(Attribute.class));
		this.daoFactory = daoFactory;
	}
}
