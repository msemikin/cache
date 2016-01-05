package ua.nure.cache.dao;

import ua.nure.cache.entity.Statistic;

public interface StatisticDAO {
	int insertStatistics(Statistic stat);
	
	boolean deleteStatistic(int statId, int projectId); 
}
