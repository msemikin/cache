package ua.nure.cache.java.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ua.nure.cache.java.dao.AttributeDAO;
import ua.nure.cache.java.dao.DAOFactory;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.dao.mysql.MysqlStatisticDAO;
import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.Resp;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;
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
		String line = req.getParameter("objeñt");
		System.out.println(line);
		Objekt jsonJavaRootObject = new Gson().fromJson(line, Objekt.class);
		System.out.println(jsonJavaRootObject.getName());
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getObjektDAO();
		int result = dao.insertObjekt(jsonJavaRootObject);
		Resp res = new Resp();
		if (result !=-1) {
			res.setId(result);
			res.setSuccess(true);
		}
		else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("attribute");
		Attribute attr = new Gson().fromJson(line, Attribute.class);
		AttributeDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getAttributeDAO();
		int result = dao.insertAttribute(attr);
		Resp res = new Resp();
		if (result !=-1) {
			res.setId(result);
			res.setSuccess(true);
		}
		else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertStatistics(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("statistic");
		Statistic stat = new Gson().fromJson(line, Statistic.class);
		stat.setProjectId(stat.getProjectId());
		int result = new MysqlStatisticDAO().insertStatistics(stat);
		Resp res = new Resp();
		if (result !=-1) {
			res.setId(result);
			res.setSuccess(true);
		}
		else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}
	

	@Override
	public void insertReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("reports");
		Report stat = new Gson().fromJson(line, Report.class);
		System.out.println(stat.getObjects().get(0).getAttrs().get(0).getName());
	}

	@Override
	public void insertDiagram(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		System.out.println(diagramType);
		
	}

	@Override
	public void insertSrchFltSrt(String whichType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		System.out.println(whichType);
		String line = req.getParameter(whichType);
		System.out.println(line);
		SrchFltSrt stat = new Gson().fromJson(line, SrchFltSrt.class);
		System.out.println(stat.getObject().getName());
	}

	@Override
	public void insertAlgDeps(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("algorithmicDependincy");
		System.out.println(line);
		AlgDeps deps = new Gson().fromJson(line, AlgDeps.class);
		System.out.println(deps.getSourceFields().get(1).getVariable());
	}


	
	
	
	

	

}
