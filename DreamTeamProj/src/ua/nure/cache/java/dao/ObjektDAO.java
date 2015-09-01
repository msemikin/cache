package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Objekt;

public interface ObjektDAO {

	int insertObjekt(Objekt obj);
	
	Objekt findObjekt(int objId, int projId);
	
	boolean deleteObjekt(int objId);
	
	boolean updateObjekt(Objekt obj);
}
