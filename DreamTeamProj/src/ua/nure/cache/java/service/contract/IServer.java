package ua.nure.cache.java.service.contract;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface IServer {

	void getAllObjects(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getAllStatistics(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getAllReports(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getDiagramByType(String diagramType, HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getInformReqSorts(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getInformReqSearches(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getInformReqFilters(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getAlgorithmicDep(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void getObjById(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void insertObject(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void insertAttribute(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void insertStatistics(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void insertReports(HttpServletRequest req, HttpServletResponse resp) throws IOException;
	
	void insertDiagram(String diagramType,HttpServletRequest req, HttpServletResponse resp)throws IOException;
	
	void insertSrchFltSrt(String which, HttpServletRequest req, HttpServletResponse resp)throws IOException;
	
	void insertAlgDeps(HttpServletRequest req, HttpServletResponse resp)throws IOException;
}
