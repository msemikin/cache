package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Project;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;
import ua.nure.cache.java.mapper.Mapper;

public class MysqlProjectDAO implements ProjectDAO {

	@Override
	public void insertProject(Project project) {

	}

	@Override
	public void deleteProject(int projectId) {

	}

	@Override
	public Project findProject(int projectId) {
		return null;

	}

	@Override
	public List<Objekt> findProcectObj(int projId) {
		Connection con = null;
		List<Objekt> proj = new ArrayList<Objekt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProcectObj(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Objekt> findProcectObj(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Objekt> proj = new ArrayList<Objekt>();
		stmt = con.prepareStatement(DBQueries.FIND_ALL_PROJECT_OBJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapProjObj(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<Statistic> findProjStat(int projId) {
		Connection con = null;
		List<Statistic> proj = new ArrayList<Statistic>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProjStat(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Statistic> findProjStat(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Statistic> proj = new ArrayList<Statistic>();
		stmt = con.prepareStatement(DBQueries.FIND_STATISTICS_PROJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapProjStat(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<Report> findProjReport(int projId) {
		Connection con = null;
		List<Report> proj = new ArrayList<Report>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProjReport(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Report> findProjReport(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Report> proj = new ArrayList<Report>();
		stmt = con.prepareStatement(DBQueries.FIND_REPORT_PROJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapReportProj(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<SrchFltSrt> findSearches(int projId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projId, DBQueries.FIND_SEARCH_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<SrchFltSrt> findSrchFltSrt(Connection con, int projId,
			String query) throws SQLException {
		PreparedStatement stmt = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		stmt = con.prepareStatement(query);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapSrchFltSrt(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<SrchFltSrt> findSorts(int projectId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projectId,
					DBQueries.FIND_SORTS_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	@Override
	public List<SrchFltSrt> findFilters(int projectId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projectId,
					DBQueries.FIND_FILTERS_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}
}
