package ua.nure.cache.dao;

import ua.nure.cache.entity.Objekt;

public interface ObjektDAO {

	int insertObjekt(Objekt obj);
	
	Objekt findObjekt(int objId, int projId);
	
	boolean deleteObjekt(int objId, int projectId);
	
	boolean updateObjekt(Objekt obj);
}
