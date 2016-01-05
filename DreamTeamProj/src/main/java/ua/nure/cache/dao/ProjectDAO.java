package ua.nure.cache.dao;

import java.util.List;

import ua.nure.cache.entity.AlgDeps;
import ua.nure.cache.entity.Objekt;
import ua.nure.cache.entity.Project;
import ua.nure.cache.entity.Report;
import ua.nure.cache.entity.SrchFltSrt;
import ua.nure.cache.entity.Statistic;

public interface ProjectDAO {
	
	void insertProject(Project project);
	
	void deleteProject(int projectId);
	
	Project findProject(int projectId);
	
	List<Objekt> findProcectObj(int projId);
	
	List<Statistic> findProjStat(int projId);
	
	List<Report> findProjReport(int projId);
	
	List<SrchFltSrt> findSearches(int projId);
	
	List<SrchFltSrt> findSorts(int projectId);
	
	List<SrchFltSrt> findFilters(int projectId);
	
	List<AlgDeps> findAlgDeps(int projectId);
	
	int insertAlgDeps(AlgDeps algDeps);
	
	boolean deleteAlgDeps(int depId);

	
}
