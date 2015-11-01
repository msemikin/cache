package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.IntegrityConstrDAO;
import ua.nure.cache.java.entity.AddObj;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Constraint;
import ua.nure.cache.java.entity.LinkConstr;
import ua.nure.cache.java.entity.Obj;

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
			AddObj object = constr.getObject();
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
			AddObj obj1 = new AddObj();
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
	public int insertLinkConstraint(LinkConstr constr) {
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

	private int insertLinkConstraint(Connection con, LinkConstr constr)
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
	public boolean updateLinkConstraint(LinkConstr constr) {
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

	private int updateLinkConstraint(Connection con, LinkConstr constr)
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
	public List<LinkConstr> getLinkConstraint(int projectId) {
		Connection con = null;
		List<LinkConstr> proj = new ArrayList<LinkConstr>();
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

	private List<LinkConstr> getLinkConstraint(Connection con, int projectId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<LinkConstr> lConstrs = new ArrayList<LinkConstr>();
		stmt = con.prepareStatement(DBQueries.GET_LINK_CONSTR);
		stmt.setInt(1, projectId);
		stmt.setInt(2, projectId);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			LinkConstr proj = new LinkConstr();
			proj.setId(rs.getInt(1));
			proj.setProjectId(rs.getInt(2));
			proj.setComment(rs.getString(3));
			Obj obj1 = new Obj();
			Obj obj2 = new Obj();
			obj1.setId(rs.getInt(4));
			obj1.setName(rs.getString(5));
			obj1.setProjectId(projectId);
			obj2.setId(rs.getInt(6));
			obj2.setName(rs.getString(7));
			obj2.setProjectId(projectId);
			proj.setFirstObject(obj1);
			proj.setSecondObj(obj2);
			proj.setName(rs.getString(8));
			lConstrs.add(proj);
		}
		MysqlDAOFactory.closeStatement(stmt);
		return lConstrs;
	}

}
