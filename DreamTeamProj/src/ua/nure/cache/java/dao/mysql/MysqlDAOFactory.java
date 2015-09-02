package ua.nure.cache.java.dao.mysql;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

import ua.nure.cache.java.dao.AttributeDAO;
import ua.nure.cache.java.dao.DAOFactory;
import ua.nure.cache.java.dao.DiagramDAO;
import ua.nure.cache.java.dao.ObjektDAO;
import ua.nure.cache.java.dao.ProjectDAO;
import ua.nure.cache.java.dao.ReportDAO;
import ua.nure.cache.java.dao.SrchFltrSrtDAO;
import ua.nure.cache.java.dao.StatisticDAO;

public class MysqlDAOFactory extends DAOFactory {
	
	private static Logger log = Logger.getLogger(MysqlDAOFactory.class);
	
	private static DataSource getDataSource()  {
		DataSource dataSource = null;
		try {
			InitialContext initContext = new InitialContext();
			dataSource = (DataSource) initContext
					.lookup("java:/comp/env/jdbc/my_db");
		} catch (NamingException e) {
			System.out.println(e.getMessage());
		}
		return dataSource;
	}

	public static Connection getConnection() {
		Connection con = null;
		try {
			con = getDataSource().getConnection();
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return con;
	}
	public static void roolback(Connection con) {
		if (con != null) {
			try {
				con.rollback();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
			}
		}
	}

	public static void commit(Connection con) {
		try {
			log.debug("Try commit transaction");
			con.commit();
		} catch (SQLException e) {
			try {
				System.out.println(e.getMessage());
				con.rollback();
			} catch (SQLException e1) {
				System.out.println(e1.getMessage());
			}
			log.error("Can not commit transaction # " + e.getMessage());
		}
	}

	public static void close(Connection con) {
		try {
			if (con != null) {
				con.close();
			}
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
	}

	public static void closeStatement(Statement stmt) throws SQLException {
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				System.out.println(e.getMessage());
				throw e;
			}
		}
	}

	public static void commitAndClose(Connection con) {
		commit(con);
		close(con);
	}

	@Override
	public AttributeDAO getAttributeDAO() {
		return new MysqlAttributeDAO();
	}
	
	public DiagramDAO getDiagramDAO(){
		return new MysqlDiagramDAO();
	}
	
	public ObjektDAO getObjektDAO() {
		return new MysqlObjektDAO();
	}
	
	public ProjectDAO getProjectDAO() {
		return new MysqlProjectDAO();
	}
	
	public ReportDAO getReportDAO() {
		return new MysqlReportDAO();
	}
	
	public StatisticDAO getStatisticDAO() {
		return new MysqlStatisticDAO();
	}
	@Override
	public SrchFltrSrtDAO getSrchFltrSrtDAO() {
		return new MysqlSrchFltrSrtDAO();
	}

	
}
