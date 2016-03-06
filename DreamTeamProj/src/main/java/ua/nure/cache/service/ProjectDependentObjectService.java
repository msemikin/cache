package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.entity.Entity;

import java.util.Collection;

public interface ProjectDependentObjectService<T> extends GenericService<T> {

	Collection<T> getByProject(final int projectId);

	T getByProject(final int projectId, final int id);

}
