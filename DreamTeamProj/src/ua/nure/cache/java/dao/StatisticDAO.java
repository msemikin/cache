package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Statistic;

public interface StatisticDAO {
	int insertStatistics(Statistic stat);
	
	boolean deleteStatistic(int statId, int projectId); 
}
