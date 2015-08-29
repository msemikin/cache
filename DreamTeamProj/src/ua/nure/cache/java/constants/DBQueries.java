package ua.nure.cache.java.constants;

public class DBQueries {

	public static final String FIND_ALL_PROJECT_OBJ = "SELECT object.object_id,object.objectName,attribute.attr_id,"
			+ "attribute.Name "
			+ "FROM object "
			+ "INNER JOIN  "
			+ "attribute on attribute.object_id = object.object_id "
			+ "where project_id = ? ";

	public static final String FIND_STATISTICS_PROJ = "SELECT statistic.statistic_id ,statistic.name, object.objectName, attribute.attr_id,attribute.Name "
			+ "from statistic "
			+ "INNER JOIN stattoobj ON stattoobj.statistic_id = statistic.statistic_id "
			+ "INNER JOIN object ON stattoobj.object_id = object.object_id "
			+ "INNER JOIN attribute ON object.object_id = attribute.object_id "
			+ "WHERE statistic.project_id =? "
			+ "ORDER BY statistic.statistic_id;";

	public static final String FIND_REPORT_PROJ = "SELECT report.report_id ,report.name, object.object_id,object.objectName, attribute.attr_id,attribute.Name "
			+ "from report  "
			+ "INNER JOIN reporttoobject ON report.report_id = reporttoobject.report_id "
			+ "INNER JOIN object ON reporttoobject.object_id = object.object_id "
			+ "INNER JOIN attribute ON object.object_id = attribute.object_id "
			+ "WHERE report.project_id =? ORDER BY report.report_id;";

	public static final String FIND_DIAGRAM_BY_TYPE_PROJ = "Select JSON From diagram where project_id=? AND Type = ?";

	public static final String FIND_SEARCH_BY_PROJ_ID = "SELECT search_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM search  "
			+ "INNER JOIN object on object.object_id = search.object_id "
			+ "INNER JOIN attribute on attribute.attr_id = search.attribute_id "
			+ "WHERE object.project_id = ? "
			+ "ORDER BY search_id, object.object_id";

	public static final String FIND_SORTS_BY_PROJ_ID = "SELECT sort_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM sort   "
			+ "INNER JOIN object on object.object_id = sort.object_id "
			+ "INNER JOIN attribute on attribute.attr_id = sort.attribute_id  "
			+ "WHERE object.project_id = ?  "
			+ "ORDER BY sort_id, object.object_id;";
	
	public static final String FIND_FILTERS_BY_PROJ_ID = "SELECT filter_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM filter   "
			+ "INNER JOIN object on object.object_id = filter.object_id  "
			+ "INNER JOIN attribute on attribute.attr_id = filter.attribute_id  "
			+ "WHERE object.project_id = ?  "
			+ "ORDER BY filter_id, object.object_id;";
	

}
