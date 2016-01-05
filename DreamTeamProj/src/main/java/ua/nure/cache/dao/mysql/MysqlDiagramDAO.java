package ua.nure.cache.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import ua.nure.cache.entity.Diagram;
import ua.nure.cache.constants.DBQueries;
import ua.nure.cache.dao.DiagramDAO;

public class MysqlDiagramDAO implements DiagramDAO {

	@Override
	public int insertDiagram(Diagram diagram) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertDiagram(con, diagram);
			if (result >0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}

	private int insertDiagram(Connection con, Diagram diagram) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_DIAGRAM,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, diagram.getProjectId());
			pstmt.setString(2, diagram.getDiagramType());
			pstmt.setString(3, diagram.getDiagram());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			ResultSet generatedKeys = pstmt.getGeneratedKeys();
			if (generatedKeys.next()) {
				return generatedKeys.getInt(1);
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public boolean deleteDiagram(int diagrId, int projectId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteDiagram(con, diagrId,projectId);
			if (result) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}

	private boolean deleteDiagram(Connection con, int diagrId, int projectId) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_DIAGRAM,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, diagrId);
			pstmt.setInt(2, projectId);
			if (pstmt.executeUpdate() != 1) {
				return false;
			}
			else {
				return true;
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public Diagram findDiagram(int projId, String type) {
		Connection con = null;
		Diagram proj = new Diagram();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findDiagram(con, projId, type);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
		
	}

	private Diagram findDiagram(Connection con, int projId, String type)throws SQLException {
		PreparedStatement stmt = null;
		Diagram proj = new Diagram();
		stmt = con.prepareStatement(DBQueries.FIND_DIAGRAM_BY_TYPE_PROJ);
		stmt.setInt(1, projId);
		stmt.setString(2, type);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			proj.setDiagram(rs.getString(1));
			proj.setId(rs.getInt(2));
		}
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public int updateDiagram(Diagram diagr) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateDiagram(con, diagr);
			if (result >0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result;
	}

	private int updateDiagram(Connection con, Diagram diagr) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_DIAGRAM,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, diagr.getDiagram());
			pstmt.setInt(2, diagr.getId());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			result = diagr.getId();
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

}
