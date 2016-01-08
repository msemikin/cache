package ua.nure.cache.dao.legacy.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.dao.legacy.IntegrityConstrDAO;
import ua.nure.cache.entity.*;
import ua.nure.cache.constants.DBQueries;

public class MysqlIntegrConstrDAO implements IntegrityConstrDAO {

	@Override
	public int insertConstraint(Constraint constr) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertConstraint(con, constr);
			if (result != -1) {
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

	private int insertConstraint(Connection con, Constraint constr)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_ATTR_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, constr.getComment());
			AddEntity object = constr.getObject();
			if (object != null) {
				pstmt.setInt(2, object.getAttr().getId());
			} else {
				pstmt.setNull(2, java.sql.Types.INTEGER);
			}
			pstmt.setInt(3, constr.getProjectId());
			pstmt.setString(4, constr.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			} else {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					result = generatedKeys.getInt(1);
				}
				return result;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("fjdks");
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public boolean updateConstraint(Constraint constr) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateConstraint(con, constr);
			if (result > 0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result > 0;
	}

	private int updateConstraint(Connection con, Constraint constr)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_ATTR_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, constr.getComment());
			pstmt.setInt(2, constr.getObject().getAttr().getId());
			pstmt.setString(3, constr.getName());
			pstmt.setInt(4, constr.getId());
			result = constr.getId();
			if (pstmt.executeUpdate() != 1) {
				return -1;
			} else {
				return result;
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public boolean deleteConstraint(int constrId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteConstraint(con, constrId);
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

	private boolean deleteConstraint(Connection con, int constrId)
			throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_ATTR_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, constrId);
			if (pstmt.executeUpdate() != 1) {
				return false;
			} else {
				return true;
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public List<Constraint> getConstraint(int projectId) {
		Connection con = null;
		List<Constraint> proj = new ArrayList<Constraint>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = getConstraint(con, projectId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Constraint> getConstraint(Connection con, int projectId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Constraint> constrs = new ArrayList<Constraint>();
		stmt = con.prepareStatement(DBQueries.GET_ATTR_CONSTR);
		stmt.setInt(1, projectId);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Constraint proj = new Constraint();
			proj.setId(rs.getInt(1));
			proj.setComment(rs.getString(2));
			proj.setProjectId(rs.getInt(3));
			Attribute attr = new Attribute();
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			AddEntity obj1 = new AddEntity();
			obj1.setId(rs.getInt(6));
			obj1.setName(rs.getString(7));
			obj1.setProjectId(projectId);
			obj1.setAttr(attr);
			proj.setName(rs.getString(8));
			proj.setObject(obj1);
			constrs.add(proj);
		}
		MysqlDAOFactory.closeStatement(stmt);
		return constrs;
	}

	@Override
	public int insertLinkConstraint(LinkConstraint constr) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertLinkConstraint(con, constr);
			if (result > 0) {
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

	private int insertLinkConstraint(Connection con, LinkConstraint constr)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_LINK_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, constr.getProjectId());
			pstmt.setInt(2, constr.getFirstObject().getId());
			pstmt.setInt(3, constr.getSecondObj().getId());
			pstmt.setString(4, constr.getComment());
			pstmt.setString(5, constr.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			} else {
				ResultSet generatedKeys = pstmt.getGeneratedKeys();
				if (generatedKeys.next()) {
					result = generatedKeys.getInt(1);
				}
				return result;
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public boolean updateLinkConstraint(LinkConstraint constr) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateLinkConstraint(con, constr);
			if (result > 0) {
				con.commit();
			} else {
				MysqlDAOFactory.roolback(con);
			}
		} catch (SQLException e) {
			MysqlDAOFactory.roolback(con);
		} finally {
			MysqlDAOFactory.close(con);
		}
		return result > 0;
	}

	private int updateLinkConstraint(Connection con, LinkConstraint constr)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_LINK_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, constr.getFirstObject().getId());
			pstmt.setInt(2, constr.getSecondObj().getId());
			pstmt.setString(3, constr.getComment());
			pstmt.setString(4, constr.getName());
			pstmt.setInt(5, constr.getId());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			} else {
				result = constr.getId();
				return result;
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public boolean deleteLinkConstraint(int constrId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteLinkConstraint(con, constrId);
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

	private boolean deleteLinkConstraint(Connection con, int constrId)
			throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_LINK_CONSTR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, constrId);
			if (pstmt.executeUpdate() != 1) {
				return false;
			} else {
				return true;
			}
		} catch (SQLException e) {
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	@Override
	public List<LinkConstraint> getLinkConstraint(int projectId) {
		Connection con = null;
		List<LinkConstraint> proj = new ArrayList<LinkConstraint>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = getLinkConstraint(con, projectId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<LinkConstraint> getLinkConstraint(Connection con, int projectId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<LinkConstraint> lConstrs = new ArrayList<LinkConstraint>();
		stmt = con.prepareStatement(DBQueries.GET_LINK_CONSTR);
		stmt.setInt(1, projectId);
		stmt.setInt(2, projectId);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			LinkConstraint proj = new LinkConstraint();
			proj.setId(rs.getInt(1));
			proj.setProjectId(rs.getInt(2));
			proj.setComment(rs.getString(3));
			EntityBase entity1 = new EntityBase();
			EntityBase entity2 = new EntityBase();
			entity1.setId(rs.getInt(4));
			entity1.setName(rs.getString(5));
			entity1.setProjectId(projectId);
			entity2.setId(rs.getInt(6));
			entity2.setName(rs.getString(7));
			entity2.setProjectId(projectId);
			proj.setFirstObject(entity1);
			proj.setSecondObj(entity2);
			proj.setName(rs.getString(8));
			lConstrs.add(proj);
		}
		MysqlDAOFactory.closeStatement(stmt);
		return lConstrs;
	}

}
