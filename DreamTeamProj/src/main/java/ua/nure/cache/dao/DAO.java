package ua.nure.cache.dao;

import java.util.List;

public interface DAO<T> {

    List<T> getAll();

    T create(T entity);

    T read(int id);

    T update(T entity);

    void delete(int id);
}
