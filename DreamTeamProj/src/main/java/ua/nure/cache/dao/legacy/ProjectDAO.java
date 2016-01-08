package ua.nure.cache.dao.legacy;

import java.util.List;

import ua.nure.cache.entity.*;
import ua.nure.cache.entity.Element;

public interface ProjectDAO {
	
	void insertProject(Project project);
	
	void deleteProject(int projectId);
	
	Project findProject(int projectId);
	
	List<Element> findProcectObj(int projId);
	
	List<Statistic> findProjStat(int projId);
	
	List<Report> findProjReport(int projId);
	
	List<InformationalRequirement> findSearches(int projId);
	
	List<InformationalRequirement> findSorts(int projectId);
	
	List<InformationalRequirement> findFilters(int projectId);
	
	List<AlgDep> findAlgDeps(int projectId);
	
	int insertAlgDeps(AlgDep algDep);
	
	boolean deleteAlgDeps(int depId);

	
}
