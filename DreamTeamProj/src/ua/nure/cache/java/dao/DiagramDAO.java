package ua.nure.cache.java.dao;

import ua.nure.cache.java.entity.Diagram;

public interface DiagramDAO {
	
	int insertDiagram(Diagram diagram);
	
	void deleteDiagram(int diagrId);
	
	Diagram findDiagram(int diagramId, String type);
	
	void updateDiagram(Diagram diagr);
	
}
