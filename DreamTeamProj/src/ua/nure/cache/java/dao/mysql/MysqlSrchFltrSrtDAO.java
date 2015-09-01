package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

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
		PreparedStatement pstmt = null;
		int result = -1;
		try {
				pstmt = con.prepareStatement(where,
						Statement.RETURN_GENERATED_KEYS);
				pstmt.setInt(1, o.getObject().getId());
				if (pstmt.executeUpdate() != 1) {
					return -1;
				}
				else {
					PreparedStatement pstmt1 = null;
					pstmt1 = con.prepareStatement(DBQueries.INSERT_ATTRIBUTE,
							Statement.RETURN_GENERATED_KEYS);
					ResultSet generatedKeys = pstmt.getGeneratedKeys();
					if (generatedKeys.next()) {
						result = generatedKeys.getInt(1);
						if (o.getObject().getAttrs().size() ==0) {
							return result;
						}
						for (Attribute attr : o.getObject().getAttrs()) {
							pstmt1.setInt(1, result);
							pstmt1.setString(2, attr.getName());
							pstmt1.executeUpdate();
						}
					}
					return result;
				}

		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

}
