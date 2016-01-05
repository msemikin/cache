package ua.nure.cache.dao;

import ua.nure.cache.entity.SrchFltSrt;

public interface SrchFltrSrtDAO {
	int insertSrchFltrSrt(SrchFltSrt o, String where);
	
	boolean deleteSrchFltrSrt(String sql, int id);
}
