package ua.nure.cache.repository;

import java.util.stream.Stream;

public interface ProjectDependentRepository<T> {

    Stream<T> findByProjectId(int projectId);

}
