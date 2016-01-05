package ua.nure.cache.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ua.nure.cache.dao.DAOFactory;
import ua.nure.cache.dao.ReportDAO;
import ua.nure.cache.dao.SrchFltrSrtDAO;
import ua.nure.cache.dao.mysql.MysqlProjectDAO;
import ua.nure.cache.dao.mysql.MysqlSrchFltrSrtDAO;
import ua.nure.cache.dao.mysql.MysqlStatisticDAO;
import ua.nure.cache.entity.Diagram;
import ua.nure.cache.constants.DBQueries;
import ua.nure.cache.dao.AttributeDAO;
import ua.nure.cache.dao.DiagramDAO;
import ua.nure.cache.dao.ObjektDAO;
import ua.nure.cache.dao.ProjectDAO;
import ua.nure.cache.dao.StatisticDAO;
import ua.nure.cache.dao.mysql.MysqlDiagramDAO;
import ua.nure.cache.dao.mysql.MysqlIntegrConstrDAO;
import ua.nure.cache.dao.mysql.MysqlReportDAO;
import ua.nure.cache.entity.Actor;
import ua.nure.cache.entity.AlgDeps;
import ua.nure.cache.entity.Attribute;
import ua.nure.cache.entity.Constraint;
import ua.nure.cache.entity.Link;
import ua.nure.cache.entity.LinkConstr;
import ua.nure.cache.entity.Objekt;
import ua.nure.cache.entity.Report;
import ua.nure.cache.entity.Resp;
import ua.nure.cache.entity.SrchFltSrt;
import ua.nure.cache.entity.Statistic;
import ua.nure.cache.entity.Student;
import ua.nure.cache.service.contract.IServer;
import ua.nure.cache.utils.Downloader;
import ua.nure.cache.utils.FileMaker;
import ua.nure.cache.utils.WordGenerator;

import com.google.gson.Gson;

public class Server implements IServer {

	@Override
	public void getAllObjects(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProcectObj(id)));
	}

	@Override
	public void getAllStatistics(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProjStat(id)));
	}

	@Override
	public void getAllReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findProjReport(id)));
	}

	@Override
	public void getDiagramByType(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		DiagramDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getDiagramDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(
				new Gson().toJson(dao.findDiagram(id, diagramType)));
	}

	@Override
	public void getInformReqSorts(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findSorts(id)));
	}

	@Override
	public void getInformReqSearches(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findSearches(id)));
	}

	@Override
	public void getInformReqFilters(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findFilters(id)));
	}

	@Override
	public void getAlgorithmicDep(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		ProjectDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getProjectDAO();
		Integer id = Integer.parseInt(req.getParameter("projectId"));
		resp.getWriter().print(new Gson().toJson(dao.findAlgDeps(id)));
	}

	@Override
	public void getObjById(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getObjektDAO();
		Integer projectId = Integer.parseInt(req.getParameter("projectId"));
		Integer objectId = Integer.parseInt(req.getParameter("objectId"));
		resp.getWriter().print(
				new Gson().toJson(dao.findObjekt(objectId, projectId)));
	}

	@Override
	public void insertObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("object");
		System.out.println(line);
		Objekt jsonJavaRootObject = new Gson().fromJson(line, Objekt.class);
		System.out.println(jsonJavaRootObject.getName());
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getObjektDAO();
		int result = dao.insertObjekt(jsonJavaRootObject);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
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
		AttributeDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getAttributeDAO();
		int result = dao.insertAttribute(attr);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
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
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertReports(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		System.out.println("here");
		String line = req.getParameter("reports");
		System.out.println(line);
		Report stat = new Gson().fromJson(line, Report.class);
		stat.setProjectId(stat.getProjectId());
		int result = new MysqlReportDAO().insertReport(stat);
		;
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertDiagram(String diagramType, HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		Diagram d = new Diagram();
		d.setDiagram(req.getParameter("diagram"));
		d.setDiagramType(diagramType);
		int result = new MysqlDiagramDAO().insertDiagram(d);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
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
		int result = new MysqlSrchFltrSrtDAO().insertSrchFltrSrt(stat,
				whichType);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertAlgDeps(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("algorithmicDependency");
		AlgDeps deps = new Gson().fromJson(line, AlgDeps.class);
		int result = new MysqlProjectDAO().insertAlgDeps(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
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
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getObjektDAO();
		boolean result = dao.deleteObjekt(objectId, projectId);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer objectId = Integer.valueOf(req.getParameter("attributeId"));
		AttributeDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getAttributeDAO();
		boolean result = dao.deleteAttribute(objectId);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteStatistic(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer statId = Integer.valueOf(req.getParameter("statisticId"));
		StatisticDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getStatisticDAO();
		boolean result = dao.deleteStatistic(statId, projectId);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void deleteReport(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer reportId = Integer.valueOf(req.getParameter("reportId"));
		ReportDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getReportDAO();
		boolean result = dao.deleteReport(reportId, projectId);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteDiagram(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer projectId = Integer.valueOf(req.getParameter("projectId"));
		Integer diagramId = Integer.valueOf(req.getParameter("diagramId"));
		DiagramDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getDiagramDAO();
		boolean result = dao.deleteDiagram(diagramId, projectId);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteSort(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_SORT, id);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void deleteSearch(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_SEARCH, id);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteFilter(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("id"));
		SrchFltrSrtDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getSrchFltrSrtDAO();
		boolean result = dao.deleteSrchFltrSrt(DBQueries.DELETE_FILTER, id);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteAlgDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Integer id = Integer.valueOf(req.getParameter("id"));
		boolean result = new MysqlProjectDAO().deleteAlgDeps(id);
		Resp res = new Resp();
		if (result != false) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateObject(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("obje�t");
		System.out.println(line);
		Objekt jsonJavaRootObject = new Gson().fromJson(line, Objekt.class);
		System.out.println(jsonJavaRootObject.getName());
		ObjektDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getObjektDAO();
		boolean result = dao.updateObjekt(jsonJavaRootObject);
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateAttribute(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("attribute");
		Attribute attr = new Gson().fromJson(line, Attribute.class);
		AttributeDAO dao = DAOFactory.getDAOFactory(DAOFactory.MYSQL)
				.getAttributeDAO();
		int result = dao.updateAttribute(attr);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateStatistic(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("statistic");
		Statistic stat = new Gson().fromJson(line, Statistic.class);
		stat.setProjectId(stat.getProjectId());
		int result = new MysqlStatisticDAO().updateStatistics(stat);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateReport(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("reports");
		Report stat = new Gson().fromJson(line, Report.class);
		stat.setProjectId(stat.getProjectId());
		int result = new MysqlReportDAO().updateReport(stat);
		;
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateDiagram(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		Diagram d = new Diagram();
		d.setId(Integer.valueOf(req.getParameter("diagramId")));
		d.setDiagram(req.getParameter("diagram"));
		int result = new MysqlDiagramDAO().updateDiagram(d);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateSort(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("sort");
		SrchFltSrt stat = new Gson().fromJson(line, SrchFltSrt.class);
		int result = new MysqlSrchFltrSrtDAO().updateSort(stat);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateSearch(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("search");
		SrchFltSrt stat = new Gson().fromJson(line, SrchFltSrt.class);
		int result = new MysqlSrchFltrSrtDAO().updateSearch(stat);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateFilter(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("filter");
		SrchFltSrt stat = new Gson().fromJson(line, SrchFltSrt.class);
		int result = new MysqlSrchFltrSrtDAO().updateFilter(stat);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateAlgDep(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("algorithmicDependency");
		AlgDeps deps = new Gson().fromJson(line, AlgDeps.class);
		int result = new MysqlProjectDAO().updateAlgDeps(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void insertAttrConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("constraint");
		Constraint deps = new Gson().fromJson(line, Constraint.class);
		int result = new MysqlIntegrConstrDAO().insertConstraint(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void updateAttrConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("constraint");
		Constraint deps = new Gson().fromJson(line, Constraint.class);
		boolean result = new MysqlIntegrConstrDAO().updateConstraint(deps);
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void deleteAttrConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("id");
		boolean result = new MysqlIntegrConstrDAO().deleteConstraint(Integer
				.valueOf(line));
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void findAttrConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("projectId");
		List<Constraint> result = new MysqlIntegrConstrDAO()
				.getConstraint(Integer.valueOf(line));
		resp.getWriter().print(new Gson().toJson(result));
	}

	@Override
	public void insertLinkConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("constraint");
		LinkConstr deps = new Gson().fromJson(line, LinkConstr.class);
		int result = new MysqlIntegrConstrDAO().insertLinkConstraint(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void updateLinkConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("constraint");
		LinkConstr deps = new Gson().fromJson(line, LinkConstr.class);
		boolean result = new MysqlIntegrConstrDAO().updateLinkConstraint(deps);
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteLinkConstr(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {
		String line = req.getParameter("id");
		boolean result = new MysqlIntegrConstrDAO()
				.deleteLinkConstraint(Integer.valueOf(line));
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void findLinkConstr(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("projectId");
		List<LinkConstr> result = new MysqlIntegrConstrDAO()
				.getLinkConstraint(Integer.valueOf(line));
		resp.getWriter().print(new Gson().toJson(result));
	}

	@Override
	public void insertActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("actor");
		Actor deps = new Gson().fromJson(line, Actor.class);
		int result = new MysqlProjectDAO().insertActor(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void updateActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("actor");
		Actor deps = new Gson().fromJson(line, Actor.class);
		boolean result = new MysqlProjectDAO().updateActor(deps);
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("id");
		boolean result = new MysqlProjectDAO().deleteActor(Integer
				.valueOf(line));
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void findActor(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("projectId");
		List<Actor> result = new MysqlProjectDAO().findActors(Integer
				.valueOf(line));
		resp.getWriter().print(new Gson().toJson(result));

	}

	@Override
	public void insertLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("link");
		Link deps = new Gson().fromJson(line, Link.class);
		int result = new MysqlProjectDAO().insertLink(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void updateLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("link");
		Actor deps = new Gson().fromJson(line, Actor.class);
		boolean result = new MysqlProjectDAO().updateActor(deps);
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void deleteLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("id");
		boolean result = new MysqlProjectDAO()
				.deleteLink(Integer.valueOf(line));
		Resp res = new Resp();
		if (result) {
			res.setSuccess(true);
		} else {
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));

	}

	@Override
	public void findLink(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		String line = req.getParameter("projectId");
		List<Link> result = new MysqlProjectDAO().findLinks(Integer
				.valueOf(line));
		resp.getWriter().print(new Gson().toJson(result));
	}

	@Override
	public void generateDocument(HttpServletRequest req,
			HttpServletResponse resp) throws IOException {

		int projectId = Integer.valueOf(req.getParameter("projectId"));
		String useCase = req.getParameter("useCase");
		String objectRelation = req.getParameter("objectRelations");
		String er = req.getParameter("er");
		FileMaker fm = new FileMaker();
		final ServletContext servletContext = req.getSession()
				.getServletContext();
		final File tempDirectory = (File) servletContext
				.getAttribute("javax.servlet.context.tempdir");
		final String temperotyFilePath = tempDirectory.getAbsolutePath();
		fm.createNewFile(useCase, temperotyFilePath+"/useCase.jpg");
		fm.createNewFile(objectRelation, temperotyFilePath+"/objectRelation.jpg");
		fm.createNewFile(er, temperotyFilePath+"/er.jpg");
		Downloader loader = new Downloader();
		try {
			WordGenerator gen = new WordGenerator();
			gen.generateDoc(projectId, temperotyFilePath);
			loader.anotherDownloadMethod("report.docx", resp);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
	}
	@Override
	public void insertSourceField(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String line = req.getParameter("algorithmicDependency");
		AlgDeps deps = new Gson().fromJson(line, AlgDeps.class);
		int result = new MysqlProjectDAO().insertSourceField(deps);
		Resp res = new Resp();
		if (result != -1) {
			res.setId(result);
			res.setSuccess(true);
		} else {
			res.setId(result);
			res.setSuccess(false);
		}
		resp.getWriter().print(new Gson().toJson(res));
	}

	@Override
	public void registerStudent(HttpServletRequest req, HttpServletResponse resp) {
		String line = req.getParameter("user");
		Student student = new Gson().fromJson(line, Student.class);
		new StudentService().registerStudent(student);
	}

	@Override
	public void loginStudent(HttpServletRequest req, HttpServletResponse resp) {
		String line = req.getParameter("user");
		Student student = new Gson().fromJson(line, Student.class);
		if(new StudentService().loginStudent(student)) {
			try {
				req.getRequestDispatcher("index.html").forward(req, resp);
			} catch (ServletException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
