package ua.nure.cache.dao;

import ua.nure.cache.entity.InformationalRequirement;

import java.util.List;

public interface InfReqDAO extends DAO<InformationalRequirement> {

    List<InformationalRequirement> getProjectSearches(final int projectId);

    List<InformationalRequirement> getProjectSorts(final int projectId);

    List<InformationalRequirement> getProjectFilters(final int projectId);

}
