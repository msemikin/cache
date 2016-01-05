package ua.nure.cache.dao;

import ua.nure.cache.dao.mysql.MysqlDAOFactory;

public abstract class DAOFactory {

	public abstract AttributeDAO getAttributeDAO();
	
	public abstract DiagramDAO getDiagramDAO();
	
	public abstract ObjektDAO getObjektDAO();
	
	public abstract ProjectDAO getProjectDAO();
	
	public abstract ReportDAO getReportDAO();
	
	public abstract StatisticDAO getStatisticDAO();
	
	public abstract SrchFltrSrtDAO getSrchFltrSrtDAO();
	
	public abstract IntegrityConstrDAO getIntegrityConstrDAO();
	
	public abstract StudentDAO getStudentDAO();
	
	public static final int MYSQL = 1;

	public static DAOFactory getDAOFactory(int whichFactory) {
		switch (whichFactory) {
		case MYSQL:
			return new MysqlDAOFactory();
		default:
			return null;
		}
	}
}
