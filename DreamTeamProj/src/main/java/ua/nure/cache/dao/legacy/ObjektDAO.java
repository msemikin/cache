package ua.nure.cache.dao.legacy;

import ua.nure.cache.entity.Element;

public interface ObjektDAO {

	int insertObjekt(Element obj);
	
	Element findObjekt(int objId, int projId);
	
	boolean deleteObjekt(int objId, int projectId);
	
	boolean updateObjekt(Element obj);
}
