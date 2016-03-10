package ua.nure.cache.service;

public interface GenericService<T> {
	T create(final T entity);
	void delete(final int id);
	T update(final T entity);
	T read(final int id);
}
