package ua.nure.cache.service.contract;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IServer {

	void getAllObjects(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getAllStatistics(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getAllReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getDiagramByType(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException;

	void getInformReqSorts(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getInformReqSearches(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getInformReqFilters(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getAlgorithmicDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void getObjById(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void insertObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void insertAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void insertStatistics(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void insertReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void insertDiagram(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException;

	void insertSrchFltSrt(String which, HttpServletRequest req,
			HttpServletResponse resp) throws IOException;

	void insertAlgDeps(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void insertSourceField(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteStatistic(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteReport(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteDiagram(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteSort(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteSearch(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void deleteFilter(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void deleteAlgDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	


	void updateObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateStatistic(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateReport(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateDiagram(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateSort(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateSearch(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;

	void updateFilter(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void updateAlgDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void insertAttrConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void updateAttrConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void deleteAttrConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void findAttrConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void insertLinkConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void updateLinkConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void deleteLinkConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void findLinkConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void insertActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void updateActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void deleteActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void findActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void insertLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void updateLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void deleteLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	void findLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void generateDocument(HttpServletRequest req, HttpServletResponse resp)
			throws IOException;
	
	void registerStudent(HttpServletRequest req, HttpServletResponse resp);

	void loginStudent(HttpServletRequest req, HttpServletResponse resp);
}
