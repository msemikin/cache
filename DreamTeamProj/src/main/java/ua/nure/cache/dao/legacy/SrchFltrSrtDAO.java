package ua.nure.cache.dao.legacy;

import ua.nure.cache.entity.InformationalRequirement;

public interface SrchFltrSrtDAO {
	int insertSrchFltrSrt(InformationalRequirement o, String where);
	
	boolean deleteSrchFltrSrt(String sql, int id);
}
