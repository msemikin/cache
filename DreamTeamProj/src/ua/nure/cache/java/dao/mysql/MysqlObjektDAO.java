package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.mapper.Mapper;

public class MysqlObjektDAO implements ObjektDAO {

	@Override
	public void insertObjekt(Objekt obj) {
		
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
	public void deleteObjekt(int objId) {
		
	}

	@Override
	public void updateObjekt(Objekt obj) {
		
	}

}
