package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Statistic;

public interface StatisticRepository extends
        CrudRepository<Statistic, Long>,
        ProjectDependentRepository<Statistic> {
}
