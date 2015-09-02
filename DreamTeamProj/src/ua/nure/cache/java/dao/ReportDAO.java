package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Report;

public interface ReportDAO {
	
	int insertReport (Report report);
	
	boolean deleteReport(int reportId, int projectId);
}
