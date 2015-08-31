package ua.nure.cache.java.constants;

public class DBQueries {

	public static final String FIND_ALL_PROJECT_OBJ = "SELECT object.object_id,object.objectName,attribute.attr_id,"
			+ "attribute.Name "
			+ "FROM object "
			+ "left JOIN  "
			+ "attribute on attribute.object_id = object.object_id "
			+ "where project_id = ? ";

	public static final String FIND_STATISTICS_PROJ = "SELECT statistic.statistic_id ,statistic.name, object.objectName, attribute.attr_id,attribute.Name "
			+ "from statistic "
			+ "left JOIN stattoobj ON stattoobj.statistic_id = statistic.statistic_id "
			+ "left JOIN object ON stattoobj.object_id = object.object_id "
			+ "left JOIN attribute ON object.object_id = attribute.object_id "
			+ "WHERE statistic.project_id =? "
			+ "ORDER BY statistic.statistic_id;";

	public static final String FIND_REPORT_PROJ = "SELECT report.report_id ,report.name, object.object_id,object.objectName, attribute.attr_id,attribute.Name "
			+ "from report  "
			+ "left JOIN reporttoobject ON report.report_id = reporttoobject.report_id "
			+ "left JOIN object ON reporttoobject.object_id = object.object_id "
			+ "left JOIN attribute ON object.object_id = attribute.object_id "
			+ "WHERE report.project_id =? ORDER BY report.report_id;";

	public static final String FIND_DIAGRAM_BY_TYPE_PROJ = "Select JSON From diagram where project_id=? AND Type = ?";

	public static final String FIND_SEARCH_BY_PROJ_ID = "SELECT search_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM search  "
			+ "left JOIN object on object.object_id = search.object_id "
			+ "left JOIN attribute on attribute.attr_id = search.attribute_id "
			+ "WHERE object.project_id = ? "
			+ "ORDER BY search_id, object.object_id";

	public static final String FIND_SORTS_BY_PROJ_ID = "SELECT sort_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM sort   "
			+ "left JOIN object on object.object_id = sort.object_id "
			+ "left JOIN attribute on attribute.attr_id = sort.attribute_id  "
			+ "WHERE object.project_id = ?  "
			+ "ORDER BY sort_id, object.object_id;";

	public static final String FIND_FILTERS_BY_PROJ_ID = "SELECT filter_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM filter   "
			+ "left JOIN object on object.object_id = filter.object_id  "
			+ "left JOIN attribute on attribute.attr_id = filter.attribute_id  "
			+ "WHERE object.project_id = ?  "
			+ "ORDER BY filter_id, object.object_id;";

	public static final String FIND_ALG_DEPS_AND_RES_FIELD = "SELECT algdeps.dep_id, algdeps.formula, algdeps.result_field,  "
			+ "object.objectName, attribute.attr_id,attribute.Name  "
			+ "From algdeps "
			+ "left join object on algdeps.result_field = object.object_id "
			+ "left join attribute on attribute.object_id = algdeps.result_field "
			+ "WHERE OBJECT.project_id = ?";

	public static final String FIND_SOURCE_FIELDS = "select algdeps.dep_id, sourcefield.varName, object.object_id,object.objectName,attribute.attr_id,attribute.Name "
			+ "FROM algdeps  "
			+ "left join depstosourfield on algdeps.dep_id = depstosourfield.dep_id "
			+ "left join sourcefield on depstosourfield.field_id = sourcefield.field_id "
			+ "left join object on sourcefield.object_id = object.object_id "
			+ "left join attribute on attribute.object_id = object.object_id "
			+ "WHERE OBJECT.project_id = ? " + "ORDER BY dep_id";

	public static final String GET_OBJ_BY_ID = "SELECT object.object_id, objectName, "
			+ "attribute.attr_id, attribute.Name FROM my_db.object "
			+ "left join attribute on attribute.object_id = object.object_id  "
			+ "WHERE object.object_id = ? AND project_id = ?;";

}
