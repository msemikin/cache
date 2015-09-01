package ua.nure.cache.java.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ua.nure.cache.java.dao.DAOFactory;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.service.contract.IServer;

import com.google.gson.Gson;

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
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findAlgDeps(id)));
	}

	@Override
	public void getObjById(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getObjektDAO();
		Integer projectId = Integer.parseInt(req.getParameter("projectId"));
		Integer objectId = Integer.parseInt(req.getParameter("objectId"));
		resp.getWriter().print(new Gson().toJson(dao.findObjekt(objectId, projectId)));
	}

	@Override
	public void insertObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("object");
		Objekt jsonJavaRootObject = new Gson().fromJson(line, Objekt.class);
		System.out.println(jsonJavaRootObject.getProjectId());
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getObjektDAO();
		dao.insertObjekt(jsonJavaRootObject);
	}

	@Override
	public void insertAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("attribute");
		Attribute attr = new Gson().fromJson(line, Attribute.class);
		System.out.println(attr.getObjectId());
		System.out.println(attr.getProjectId());
	}

	@Override
	public void insertStatistics(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertDiagram(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertSrchFltSrt(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void insertInformReq(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		// TODO Auto-generated method stub
		
	}
	
	
	
	

	

}
