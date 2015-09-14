package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import ua.nure.cache.java.constants.DBQueries;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.entity.Actor;
import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Link;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Project;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SourceField;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;
import ua.nure.cache.java.mapper.Mapper;

public class MysqlProjectDAO implements ProjectDAO {
	Logger log = Logger.getLogger(MysqlProjectDAO.class);

	@Override
	public void insertProject(Project project) {

	}

	@Override
	public void deleteProject(int projectId) {

	}

	@Override
	public Project findProject(int projectId) {
		return null;

	}

	@Override
	public List<Objekt> findProcectObj(int projId) {
		Connection con = null;
		List<Objekt> proj = new ArrayList<Objekt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProcectObj(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Objekt> findProcectObj(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Objekt> proj = new ArrayList<Objekt>();
		stmt = con.prepareStatement(DBQueries.FIND_ALL_PROJECT_OBJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapProjObj(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<Statistic> findProjStat(int projId) {
		Connection con = null;
		List<Statistic> proj = new ArrayList<Statistic>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProjStat(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Statistic> findProjStat(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Statistic> proj = new ArrayList<Statistic>();
		stmt = con.prepareStatement(DBQueries.FIND_STATISTICS_PROJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapProjStat(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<Report> findProjReport(int projId) {
		Connection con = null;
		List<Report> proj = new ArrayList<Report>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findProjReport(con, projId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<Report> findProjReport(Connection con, int projId)
			throws SQLException {
		PreparedStatement stmt = null;
		List<Report> proj = new ArrayList<Report>();
		stmt = con.prepareStatement(DBQueries.FIND_REPORT_PROJ);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapReportProj(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<SrchFltSrt> findSearches(int projId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projId, DBQueries.FIND_SEARCH_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<SrchFltSrt> findSrchFltSrt(Connection con, int projId,
			String query) throws SQLException {
		PreparedStatement stmt = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		stmt = con.prepareStatement(query);
		stmt.setInt(1, projId);
		ResultSet rs = stmt.executeQuery();
		proj = Mapper.unmapSrchFltSrt(rs);
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	@Override
	public List<SrchFltSrt> findSorts(int projectId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projectId,
					DBQueries.FIND_SORTS_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	@Override
	public List<SrchFltSrt> findFilters(int projectId) {
		Connection con = null;
		List<SrchFltSrt> proj = new ArrayList<SrchFltSrt>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findSrchFltSrt(con, projectId,
					DBQueries.FIND_FILTERS_BY_PROJ_ID);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	@Override
	public List<AlgDeps> findAlgDeps(int projectId) {
		Connection con = null;
		List<AlgDeps> proj = new ArrayList<AlgDeps>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findAlgDeps(con, projectId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
	}

	private List<AlgDeps> findAlgDeps(Connection con, int projectId)
			throws SQLException {
		PreparedStatement stmt1 = null;
		PreparedStatement stmt2 = null;
		List<AlgDeps> proj = new ArrayList<AlgDeps>();
		stmt1 = con.prepareStatement(DBQueries.FIND_ALG_DEPS_AND_RES_FIELD);
		stmt2 = con.prepareStatement(DBQueries.FIND_SOURCE_FIELDS);
		stmt1.setInt(1, projectId);
		stmt2.setInt(1, projectId);
		ResultSet rs1 = stmt1.executeQuery();
		ResultSet rs2 = stmt2.executeQuery();
		proj = Mapper.unmapResourceField(rs1);
		proj = Mapper.unmapSourceFields(rs2, proj);
		MysqlDAOFactory.closeStatement(stmt1);
		MysqlDAOFactory.closeStatement(stmt2);
		return proj;
	}

	@Override
	public int insertAlgDeps(AlgDeps algDeps) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertAlgDeps(con, algDeps);
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

	private int insertAlgDeps(Connection con, AlgDeps algDeps)
			throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_ALG_DEPS,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, algDeps.getResultField().getId());
			pstmt.setString(2, algDeps.getFormula());
			pstmt.setString(3, algDeps.getName());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			ResultSet generatedKeys = pstmt.getGeneratedKeys();
			if (generatedKeys.next()) {
				result = generatedKeys.getInt(1);
				for (SourceField o : algDeps.getSourceFields()) {
					PreparedStatement pstmt1 = con.prepareStatement(
							DBQueries.INSERT_SOURCE_FIELD,
							Statement.RETURN_GENERATED_KEYS);
					pstmt1.setString(1, o.getVariable());
					pstmt1.setInt(2, o.getObject().getAttr().getId());
					pstmt1.executeUpdate();
					ResultSet genKeys = pstmt1.getGeneratedKeys();
					if (genKeys.next()) {
						int sfId = genKeys.getInt(1);
						PreparedStatement pstmt2 = con.prepareStatement(
								DBQueries.INSERT_DEP_TO_SF,
								Statement.RETURN_GENERATED_KEYS);
						pstmt2.setInt(1, result);
						pstmt2.setInt(2, sfId);
						pstmt2.executeUpdate();
					}
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
	public boolean deleteAlgDeps(int depId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteAlgDeps(con, depId);
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

	private boolean deleteAlgDeps(Connection con, int depId)
			throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_ALG_DEP,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, depId);
			if (pstmt.executeUpdate() != 1) {
				return false;
			} else {
				return true;
			}
		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}

	public int updateAlgDeps(AlgDeps deps) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateAlgDeps(con, deps);
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

	private int updateAlgDeps(Connection con, AlgDeps deps) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_ALG_DEP,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, deps.getResultField().getId());
			pstmt.setString(2, deps.getFormula());
			pstmt.setString(3, deps.getName());
			pstmt.setInt(4, deps.getId());
			if (pstmt.executeUpdate() != 1) {
				return -1;
			}
			result = deps.getId();
			for (SourceField o : deps.getSourceFields()) {
				
				PreparedStatement pstmt2 = con.prepareStatement(
						"Delete from depstosourfield where dep_id =?",
						Statement.RETURN_GENERATED_KEYS);
				pstmt2.setInt(1, result);
				pstmt2.executeUpdate();
				PreparedStatement pstmt1 = con.prepareStatement(
						DBQueries.UPDATE_SF, Statement.RETURN_GENERATED_KEYS);
				pstmt1.setString(1, o.getVariable());
				pstmt1.setInt(2, o.getObject().getAttr().getId());
				pstmt1.setInt(3, o.getFiledId());
				pstmt1.executeUpdate();
				PreparedStatement pstmt3 = con.prepareStatement(
						DBQueries.INSERT_DEP_TO_SF,
						Statement.RETURN_GENERATED_KEYS);
				pstmt3.setInt(1, result);
				pstmt3.setInt(2, o.getFiledId());
				pstmt3.executeUpdate();
			}
		} catch (SQLException e) {
			log.error(e);
		} finally {
			MysqlDAOFactory.closeStatement(pstmt);
		}
		return result;
	}
	
	public int insertLink(Link obj) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertLink(con, obj);
			if (result >0) {
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

	private int insertLink(Connection con, Link obj) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_LINK,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, obj.getFirstObjName().getId());
			pstmt.setInt(2, obj.getSeondObjName().getId());
			pstmt.setString(3, obj.getLinkType());
			pstmt.setString(4, obj.getComment());
			pstmt.setInt(5, obj.getProjectId());
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

	public List<Link> findLinks(int projectId) {
		Connection con = null;
		List<Link> proj = new ArrayList<Link>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findLink(con, projectId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
		
	}

	private List<Link> findLink(Connection con, int projectId) throws SQLException {
		PreparedStatement stmt = null;
		List<Link> proj = new ArrayList<Link>();
		stmt = con.prepareStatement(DBQueries.GET_LINK);
		stmt.setInt(1, projectId);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Link link = new Link();
			link.setLinkId(rs.getInt(1));
			link.getFirstObjName().setName(rs.getString(2));
			link.getSeondObjName().setName(rs.getString(3));
			link.setLinkType(rs.getString(4));
			link.setComment(rs.getString(5));
			link.setProjectId(rs.getInt(6));
			proj.add(link);
		}
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	public boolean deleteLink(int linkId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteLink(con, linkId);
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

	private boolean deleteLink(Connection con, int linkId) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_LINK,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, linkId);
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

	public boolean updateLink(Link obj) {
		boolean result = true;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateLink(con, obj);
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

	private boolean updateLink(Connection con, Link obj) throws SQLException {
		PreparedStatement pstmt = null;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_LINK,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, obj.getFirstObjName().getId());
			pstmt.setInt(2, obj.getSeondObjName().getId());
			pstmt.setString(3, obj.getLinkType());
			pstmt.setString(4, obj.getComment());
			pstmt.setInt(5, obj.getProjectId());
			pstmt.setInt(6, obj.getLinkId());
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
	
	public int insertActor(Actor obj) {
		int result = -1;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = insertActor(con, obj);
			if (result >0) {
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

	private int insertActor(Connection con, Actor obj) throws SQLException {
		PreparedStatement pstmt = null;
		int result = -1;
		try {
			pstmt = con.prepareStatement(DBQueries.INSERT_ACTOR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, obj.getActorName());
			pstmt.setInt(2, obj.getProjectId());
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

	public List<Actor> findActors(int projectId) {
		Connection con = null;
		List<Actor> proj = new ArrayList<Actor>();
		try {
			con = MysqlDAOFactory.getConnection();
			proj = findActors(con, projectId);
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		} finally {
			MysqlDAOFactory.close(con);
		}
		return proj;
		
	}

	private List<Actor> findActors(Connection con, int projectId) throws SQLException {
		PreparedStatement stmt = null;
		List<Actor> proj = new ArrayList<Actor>();
		stmt = con.prepareStatement(DBQueries.GET_ACTOR);
		stmt.setInt(1, projectId);
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Actor actor = new Actor();
			actor.setActorId(rs.getInt(1));
			actor.setActorName(rs.getString(2));
			actor.setProjectId(rs.getInt(3));
			proj.add(actor);
		}
		MysqlDAOFactory.closeStatement(stmt);
		return proj;
	}

	public boolean deleteActor(int actorId) {
		boolean result = false;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = deleteActor(con, actorId);
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

	private boolean deleteActor(Connection con, int linkId) throws SQLException {
		PreparedStatement pstmt = null;
		boolean result = false;
		try {
			pstmt = con.prepareStatement(DBQueries.DELETE_ACTOR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setInt(1, linkId);
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

	public boolean updateActor(Actor obj) {
		boolean result = true;
		Connection con = null;
		try {
			con = MysqlDAOFactory.getConnection();
			result = updateActor(con, obj);
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

	private boolean updateActor(Connection con, Actor obj) throws SQLException {
		PreparedStatement pstmt = null;
		try {
			pstmt = con.prepareStatement(DBQueries.UPDATE_ACTOR,
					Statement.RETURN_GENERATED_KEYS);
			pstmt.setString(1, obj.getActorName());
			pstmt.setInt(2, obj.getProjectId());
			pstmt.setInt(3, obj.getActorId());
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
