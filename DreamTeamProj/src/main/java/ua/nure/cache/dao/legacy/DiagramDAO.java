package ua.nure.cache.dao.legacy;

import ua.nure.cache.entity.Diagram;

public interface DiagramDAO {

	int insertDiagram(Diagram diagram);

	boolean deleteDiagram(int diagrId, int projectId);

	Diagram findDiagram(int diagramId, String type);

	int updateDiagram(Diagram diagr);

}
