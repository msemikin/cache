package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.mapper.Mapper;

public class MysqlObjektDAO implements ObjektDAO {
	
	Logger log = Logger.getLogger(MysqlObjektDAO.class);
	
	@Override
	public int insertObjekt(Objekt obj) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertObjekt(con, obj);
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

	private int insertObjekt(Connection con, Objekt obj) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_OBJECT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, obj.getProjectId());
			pstmt.setString(2, obj.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			else {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					result = generatedKeys.getInt(1);
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

	@Override
	public Objekt findObjekt(int objId, int projId) {
		Connection con = null;
		Objekt proj = new Objekt();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findObjekt(con, objId, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
		
	}

	private Objekt findObjekt(Connection con, int objId, int projId) throws SQLException {
		PreparedStatement stmt = null;
		Objekt proj = new Objekt();
		stmt = con.prepareStatement(DBQueries.GET_OBJ_BY_ID);
		stmt.setInt(1, objId);
		stmt.setInt(2, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapObj(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public boolean deleteObjekt(int objId, int projectId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteObjekt(con, objId,projectId);
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

	private boolean deleteObjekt(Connection con, int objId, int projectId) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_OBJECT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, objId);
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

	@Override
	public boolean updateObjekt(Objekt obj) {
		boolean result = true;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateObjekt(con, obj);
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

	private boolean updateObjekt(Connection con, Objekt obj) throws SQLException {
		PreparedStatement pstmt = null;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_OBJECT,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, obj.getName());
			pstmt.setInt(2, obj.getId());
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
		return false;
	}

}
