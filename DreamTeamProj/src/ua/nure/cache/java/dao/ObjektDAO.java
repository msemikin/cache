package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Objekt;

public interface ObjektDAO {

	void insertObjekt(Objekt obj);
	
	Objekt findObjekt(int objId);
	
	void deleteObjekt(int objId);
	
	void updateObjekt(Objekt obj);
}
