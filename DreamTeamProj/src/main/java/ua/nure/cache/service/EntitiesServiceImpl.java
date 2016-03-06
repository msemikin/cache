package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.entity.Entity;

@Service
@Transactional
public class EntitiesServiceImpl extends ProjectDependentObjectServiceImpl<Entity> implements EntitiesService {

	@Autowired
	public EntitiesServiceImpl(final DAOFactory daoFactory) {
		super(Entity.class, daoFactory);
	}
}
