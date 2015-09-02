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

	public static final String FIND_SEARCH_BY_PROJ_ID = " SELECT search.search_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM search    "
			+ "left JOIN object on object.object_id = search.object_id  "
			+ "left join searchtoattr on searchtoattr.search_id = object.object_id "
			+ "left join attribute on searchtoattr.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ?  ORDER BY search_id, object.object_id;";

	public static final String FIND_SORTS_BY_PROJ_ID = "SELECT sort.sort_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM sort "
			+ "left JOIN object on object.object_id = sort.object_id  "
			+ "left join sorttoattr on sorttoattr.sort_id = object.object_id "
			+ "left join attribute on sorttoattr.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ? ORDER BY sort_id, object.object_id;";

	public static final String FIND_FILTERS_BY_PROJ_ID = "SELECT filter.filter_id,object.object_id, objectName,attribute.attr_id,attribute.Name FROM filter     "
			+ "left JOIN object on object.object_id = filter.object_id   "
			+ "left join filtertoattribute on filtertoattribute.filter_id = object.object_id  "
			+ "left join attribute on filtertoattribute.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ?  ORDER BY filter_id, object.object_id;";

	public static final String FIND_ALG_DEPS_AND_RES_FIELD = "SELECT algdeps.dep_id, algdeps.formula, algdeps.result_field,algdeps.name,  "
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
	
	public static final String INSERT_OBJECT ="INSERT INTO `my_db`.`object` "
			+ "(`project_id`,`objectName`) "
			+ "VALUES (?,?);";
	public static final String INSERT_ATTRIBUTE = "INSERT INTO `my_db`.`attribute` "
			+ "(`object_id`,`Name`) "
			+ "VALUES (?,?);";
	public static final String INSERT_STATISTIC = "INSERT INTO `my_db`.`statistic` "
			+ "(`project_id`,`name`) "
			+ "VALUES (?,?);";
	
	public static final String INSERT_STAT_TO_OBJ = "INSERT INTO `my_db`.`stattoobj` (`statistic_id`, `object_id`) VALUES (?,?);";

	public static final String INSERT_REPORT = "INSERT INTO `my_db`.`report` ( `project_id`, `name`) VALUES (?,?);";

	public static final String INSERT_REP_TO_OBJ = "INSERT INTO `my_db`.`reporttoobject` (`report_id`, `object_id`) VALUES (?,?);";
	
	public static final String INSERT_DIAGRAM = "INSERT INTO `my_db`.`diagram`(`project_id`,`Type`,`JSON`) VALUES (?,?,?);";
	
	public static final String INSERT_FILTER ="INSERT INTO `my_db`.`filter`(`filter_id`,`object_id`) VALUES (?,?);";
	
	public static final String FILTER_TO_ATTR = "INSERT INTO filtertoattribute VALUES (?,?)";
	
	public static final String INSERT_SEARCH ="INSERT INTO `my_db`.`search`(`search_id`,`object_id`) VALUES (?,?);";
	
	public static final String SEARCH_TO_ATTR = "INSERT INTO searchtoattr VALUES (?,?);";
	
	public static final String INSERT_SORT ="INSERT INTO `my_db`.`sort`(`sort_id`,`object_id`) VALUES (?,?);";

	public static final String SORT_TO_ATTR = "INSERT INTO sorttoattr VALUES (?,?);";
	
	
	public static final String INSERT_ALG_DEPS ="INSERT INTO algdeps (`result_field`,`formula`,'name') Values(?,?,?);";
	
	public static final String INSERT_SOURCE_FIELD ="INSERT INTO sourcefield (`varName`,`object_id`) Values(?,?);";
	
	public static final String INSERT_DEP_TO_SF ="INSERT INTO depstosourfield (`dep_id`,`field_id`) VALUES (?,?); ";
	
	
	public static final String DELETE_OBJECT = "DELETE FROM `my_db`.`object` WHERE `object_id`=? and project_id =?;";
	
	public static final String DELETE_ATTRIBUTE ="DELETE FROM `my_db`.`attribute` WHERE `attr_id`=?;";
	
	public static final String DELETE_STATISTIC ="DELETE FROM `my_db`.`statistic` WHERE `statistic_id`=? and project_id =?;";
	
	public static final String DELETE_REPORT ="DELETE FROM `my_db`.`report` WHERE `report_id`=? and project_id =?;";
	
	public static final String DELETE_DIAGRAM ="DELETE FROM `my_db`.`diagram` WHERE `diagram_id`=? and project_id =?;";
	
	public static final String DELETE_SORT ="DELETE FROM `my_db`.`sort` WHERE `sort_id`=?;";
	
	public static final String DELETE_SEARCH ="DELETE FROM `my_db`.`search` WHERE `search_id`=?;";
	
	public static final String DELETE_FILTER ="DELETE FROM `my_db`.`filter` WHERE `filter_id`=?;";
	
	public static final String DELETE_ALG_DEP = "DELETE FROM `my_db`.`algdeps` WHERE `dep_id`=?;";
	
	public static final String DELETE_SF = "DELETE FROM `my_db`.`algdeps` WHERE `dep_id`=?;";
	
	
	
	public static final String UPDATE_OBJECT ="UPDATE `my_db`.`object` SET `objectName`=? WHERE `object_id`=?;";
	
	public static final String UPDATE_ATTRIBUTE ="UPDATE `my_db`.`attribute` SET `object_id`=?, `Name`=? "
			+ "WHERE `attr_id`=?;";
	
	public static final String UPDATE_STATISTIC ="UPDATE `my_db`.`statistic` SET `name`=? WHERE `statistic_id`=?;";
	
	public static final String UPDATE_REPORT ="UPDATE `my_db`.`report` SET `name`=? WHERE `report_id`=?;";
	
	public static final String UPDATE_DIAGRAM = "UPDATE `my_db`.`diagram` SET  `JSON`=? WHERE `diagram_id`=?;";
	
	public static final String UPDATE_SEARCH = "UPDATE `my_db`.`search` SET `object_id`=? WHERE `search_id`=?;";
	
	public static final String UPDATE_FILTER = "UPDATE `my_db`.`filter` SET `object_id`=? WHERE `filter_id`=?;";
	
	public static final String UPDATE_SORT = "UPDATE `my_db`.`sort` SET `object_id`=? WHERE `sort_id`=?;";
	
	public static final String UPDATE_ALG_DEP = "UPDATE `my_db`.`algdeps` SET `result_field`=?, `formula`=?, "
			+ "`name`=? WHERE `dep_id`=?;";
	
	public static final String UPDATE_SF ="UPDATE `my_db`.`sourcefield` SET `varName`=?, `object_id`=? WHERE `field_id`=?;";
	
	
}
