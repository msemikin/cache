package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.ReportDAO;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Report;

public class MysqlReportDAO implements ReportDAO {
	Logger log = Logger.getLogger(MysqlReportDAO.class);
	@Override
	public int insertReport(Report report) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertReport(con, report);
			if (result>0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			log.error(e);
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}
	private int insertReport(Connection con, Report report) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_REPORT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, report.getProjectId());
			pstmt.setString(2, report.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			ResultSet generatedKeys = pstmt.getGeneratedKeys();
			if (generatedKeys.next()) {
				result = generatedKeys.getInt(1);
				for (Objekt obj : report.getObjects()) {
					PreparedStatement stmt  = con.prepareStatement(DBQueries.INSERT_REP_TO_OBJ,
							Statement.RETURN_GENERATED_KEYS);
					stmt.setInt(1, result);
					stmt.setInt(2, obj.getId());
					stmt.executeUpdate();
				}
			}
		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}
	@Override
	public boolean deleteReport(int reportId, int projectId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteReport(con, reportId,projectId);
			if (result) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			log.error(e);
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}
	private boolean deleteReport(Connection con, int reportId, int projectId) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_REPORT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, reportId);
			pstmt.setInt(2, projectId);
			if (pstmt.executeUpdate() != 1) {
				return false;
			}
			else {
				return true;
			}
		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}
	
	public int updateReport(Report stat) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateReport(con, stat);
			if (result>0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			log.error(e);
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}
	private int updateReport(Connection con, Report stat) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_REPORT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, stat.getName());
			pstmt.setInt(2, stat.getId());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			PreparedStatement pstmt1 = con.prepareStatement("Delete from reporttoobject where report_id =?");
			pstmt1.setInt(1, stat.getId());
			pstmt1.executeUpdate();
			result = stat.getId();
			for (Objekt obj : stat.getObjects()) {
				PreparedStatement stmt = con.prepareStatement(
						DBQueries.INSERT_REP_TO_OBJ,
						Statement.RETURN_GENERATED_KEYS);
				stmt.setInt(1, stat.getId());
				stmt.setInt(2, obj.getId());
				stmt.executeUpdate();
			}
		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

}
