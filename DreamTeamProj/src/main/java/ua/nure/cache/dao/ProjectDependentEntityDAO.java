package ua.nure.cache.dao;

import java.util.List;

public interface ProjectDependentEntityDAO<T> extends DAO<T> {

    List<T> getByProject(final int projectId);

}
