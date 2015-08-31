package ua.nure.cache.java.dao;

import java.util.List;

import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Project;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;

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
	
}
