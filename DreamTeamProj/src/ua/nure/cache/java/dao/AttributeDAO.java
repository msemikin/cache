package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Attribute;

public interface AttributeDAO {

	int insertAttribute(Attribute attr);
	
	boolean deleteAttribute(int attributeId);
	
	void updateAttribute(Attribute attr);
	
	Attribute getAttribute(int attributeId);
	
}
