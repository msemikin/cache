package ua.nure.cache.dao;

import ua.nure.cache.entity.Attribute;

public interface AttributeDAO {

	int insertAttribute(Attribute attr);
	
	boolean deleteAttribute(int attributeId);
	
	int updateAttribute(Attribute attr);
	
	Attribute getAttribute(int attributeId);
	
}
