package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Attribute;

public interface AttributeDAO {

	int insertAttribute(Attribute attr);
	
	void deleteAttribute(int attributeId);
	
	void updateAttribute(Attribute attr);
	
	Attribute getAttribute(int attributeId);
	
}
