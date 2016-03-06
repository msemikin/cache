package ua.nure.cache.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.nure.cache.dao.*;

public class GenericServiceImpl<T> implements GenericService<T> {

	private final DAO<T> dao;

	public GenericServiceImpl(final DAO<T> dao) {
		this.dao = dao;
	}

	@Override
	public T create(final T entity) {
		return dao.create(entity);
	}

	@Override
	public void delete(final int id) {
		dao.delete(id);
	}

	@Override
	public T update(final T entity) {
		return dao.update(entity);
	}

	@Override
	public void read(final int id) {
		dao.read(id);
	}

}
