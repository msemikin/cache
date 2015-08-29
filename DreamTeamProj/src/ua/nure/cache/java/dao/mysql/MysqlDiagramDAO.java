package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.entity.Diagram;

public class MysqlDiagramDAO implements DiagramDAO {

	@Override
	public void insertDiagram(Diagram diagram) {
		
	}

	@Override
	public void deleteDiagram(int diagrId) {
		
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
		}
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public void updateDiagram(Diagram diagr) {
		
	}

}
