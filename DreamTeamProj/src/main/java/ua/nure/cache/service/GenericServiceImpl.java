package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.DAO;

@Transactional
public class GenericServiceImpl<T> implements GenericService<T> {

	private final DAO<T> dao;

	public GenericServiceImpl(final DAO<T> dao) {
		this.dao = dao;
	}

	@Override
	public void create(final T entity) {
		dao.create(entity);
	}

	@Override
	public void delete(final int id) {
		dao.delete(id);
	}

	@Override
	public void update(final T entity) {
		dao.update(entity);
	}

	@Override
	public void read(final int id) {
		dao.read(id);
	}

}
