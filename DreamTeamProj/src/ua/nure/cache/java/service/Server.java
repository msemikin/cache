package ua.nure.cache.java.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import ua.nure.cache.java.dao.DAOFactory;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.service.contract.IServer;

public class Server implements IServer{

	@Override
	public void getAllObjects(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProcectObj(id)));
	}

	@Override
	public void getAllStatistics(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProjStat(id)));
	}

	@Override
	public void getAllReports(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProjReport(id)));
	}

	@Override
	public void getDiagramByType(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		DiagramDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getDiagramDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findDiagram(id, diagramType)));
	}

	@Override
	public void getInformReqSorts(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findSorts(id)));
	}

	@Override
	public void getInformReqSearches(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findSearches(id)));
	}

	@Override
	public void getInformReqFilters(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findFilters(id)));
	}

	@Override
	public void getAlgorithmicDep(HttpServletRequest req,
			HttpServletResponse resp) {
		
	}

	

}
