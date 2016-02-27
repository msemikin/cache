package ua.nure.cache.service;

public interface GenericService<T> {
	void create(final T entity);
	void delete(final int id);
	void update(final T entity);
	void read(final int id);
}
