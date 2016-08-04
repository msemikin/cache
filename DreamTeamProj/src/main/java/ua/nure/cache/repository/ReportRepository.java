package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Report;

public interface ReportRepository extends
        CrudRepository<Report, Long>,
        ProjectDependentRepository<Report> {
}
