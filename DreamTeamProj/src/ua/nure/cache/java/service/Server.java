package ua.nure.cache.java.service;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.AttributeDAO;
import ua.nure.cache.java.dao.DAOFactory;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.dao.ReportDAO;
import ua.nure.cache.java.dao.SrchFltrSrtDAO;
import ua.nure.cache.java.dao.StatisticDAO;
import ua.nure.cache.java.dao.mysql.MysqlDiagramDAO;
import ua.nure.cache.java.dao.mysql.MysqlProjectDAO;
import ua.nure.cache.java.dao.mysql.MysqlReportDAO;
import ua.nure.cache.java.dao.mysql.MysqlSrchFltrSrtDAO;
import ua.nure.cache.java.dao.mysql.MysqlStatisticDAO;
import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Diagram;
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
		String line = req.getParameter("obje�t");
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
		stat.setProjectId(stat.getProjectId());
		int result = new MysqlReportDAO().insertReport(stat);;
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
	public void insertDiagram(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		System.out.println(diagramType);
		Diagram d = new Diagram();
		d.setDiagram(req.getParameter("diagram"));
		d.setDiagramType(diagramType);
		int result = new MysqlDiagramDAO().insertDiagram(d);
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
	public void insertSrchFltSrt(String whichType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter(whichType);
		System.out.println(whichType);
		SrchFltSrt stat = new Gson().fromJson(line, SrchFltSrt.class);
		int result = new MysqlSrchFltrSrtDAO().insertSrchFltrSrt(stat, whichType);
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
	public void insertAlgDeps(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("algorithmicDependincy");
		AlgDeps deps = new Gson().fromJson(line, AlgDeps.class);
		int result = new MysqlProjectDAO().insertAlgDeps(deps);
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
	public void deleteObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer objectId = Integer.valueOf(req.getParameter("objectId"));
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getObjektDAO();
		boolean result = dao.deleteObjekt(objectId, projectId);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer objectId = Integer.valueOf(req.getParameter("attributeId"));
		AttributeDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getAttributeDAO();
		boolean result = dao.deleteAttribute(objectId);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteStatistic(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer statId = Integer.valueOf(req.getParameter("statisticId"));
		StatisticDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getStatisticDAO();
		boolean result = dao.deleteStatistic(statId, projectId);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void deleteReport(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer reportId = Integer.valueOf(req.getParameter("reportId"));
		ReportDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getReportDAO();
		boolean result = dao.deleteReport(reportId, projectId);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteDiagram(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer diagramId = Integer.valueOf(req.getParameter("diagramId"));
		DiagramDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getDiagramDAO();
		boolean result = dao.deleteDiagram(diagramId, projectId);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteSort(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("Id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_SORT, id);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void deleteSearch(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("Id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_SEARCH, id);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteFilter(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("Id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL).getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_FILTER, id);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
		
	}

	@Override
	public void deleteAlgDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("Id"));
		boolean result = new MysqlProjectDAO().deleteAlgDeps(id);
		Resp res = new Resp();
		if (result !=false) {
			res.setSuccess(true);
		}
		else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}


	
	
	
	

	

}
