package ua.nure.cache.dao;

public interface DAO<T> {
    T create(T entity);

    T read(int id);

    T update(T entity);

    void delete(T entity);
}
