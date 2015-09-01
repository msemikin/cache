package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.StatisticDAO;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Statistic;

public class MysqlStatisticDAO implements StatisticDAO {
	Logger log = Logger.getLogger(MysqlStatisticDAO.class);

	@Override
	public int insertStatistics(Statistic stat) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertStatistics(con, stat);
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

	private int insertStatistics(Connection con, Statistic stat) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_STATISTIC,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, stat.getProjectId());
			pstmt.setString(2, stat.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			ResultSet generatedKeys = pstmt.getGeneratedKeys();
			if (generatedKeys.next()) {
				result = generatedKeys.getInt(1);
				for (Objekt obj : stat.getObjects()) {
					int objectId = new MysqlObjektDAO().insertObjekt(obj);
					PreparedStatement stmt  = con.prepareStatement(DBQueries.INSERT_STAT_TO_OBJ,
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
