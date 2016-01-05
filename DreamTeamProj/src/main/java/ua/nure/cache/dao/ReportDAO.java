package ua.nure.cache.dao;

import ua.nure.cache.entity.Report;

public interface ReportDAO {
	
	int insertReport (Report report);
	
	boolean deleteReport(int reportId, int projectId);
}
