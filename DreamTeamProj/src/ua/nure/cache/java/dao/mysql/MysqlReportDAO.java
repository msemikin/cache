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
			if (result !=-1) {
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
					int objectId = new MysqlObjektDAO().insertObjekt(obj);
					PreparedStatement stmt  = con.prepareStatement(DBQueries.INSERT_REP_TO_OBJ,
							Statement.RETURN_GENERATED_KEYS);
					stmt.setInt(1, result);
					stmt.setInt(2, objectId);
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

}
