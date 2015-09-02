package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.SrchFltrSrtDAO;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.SrchFltSrt;

public class MysqlSrchFltrSrtDAO implements SrchFltrSrtDAO {

	Logger log = Logger.getLogger(MysqlSrchFltrSrtDAO.class);

	@Override
	public int insertSrchFltrSrt(SrchFltSrt o, String where) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertSrchFltrSrt(con, o, where);
			if (result != -1) {
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

	private int insertSrchFltrSrt(Connection con, SrchFltSrt o, String where) throws SQLException {
		Map <String,String> whereToInsert = new HashMap<String, String>();
		whereToInsert.put("sort", DBQueries.INSERT_SORT);
		whereToInsert.put("filter", DBQueries.INSERT_FILTER);
		whereToInsert.put("search", DBQueries.INSERT_SEARCH);
		whereToInsert.put(DBQueries.INSERT_FILTER, DBQueries.FILTER_TO_ATTR);
		whereToInsert.put(DBQueries.INSERT_SEARCH, DBQueries.SEARCH_TO_ATTR);
		whereToInsert.put(DBQueries.INSERT_SORT, DBQueries.SORT_TO_ATTR);
		
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(whereToInsert.get(where),
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, o.getProjectId());
			pstmt.setInt(2,o.getObject().getId());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			ResultSet generatedKeys = pstmt.getGeneratedKeys();
			if (generatedKeys.next()) {
				result = generatedKeys.getInt(1);
				for (Attribute obj : o.getObject().getAttrs()) {
					PreparedStatement stmt  = con.prepareStatement(whereToInsert.get(whereToInsert.get(where)),
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
	public boolean deleteSrchFltrSrt(String sql, int id) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteSrchFltrSrt(con, sql,id);
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

	private boolean deleteSrchFltrSrt(Connection con, String sql, int id) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(sql,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, id);
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

}
