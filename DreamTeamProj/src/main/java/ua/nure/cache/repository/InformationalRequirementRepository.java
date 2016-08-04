package ua.nure.cache.repository;

import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.InformationalRequirement;

import java.util.stream.Stream;

public interface InformationalRequirementRepository
        extends CrudRepository<InformationalRequirement, Long>,
        ProjectDependentRepository<InformationalRequirement> {

    Stream<InformationalRequirement> findByType(final String type);

}
