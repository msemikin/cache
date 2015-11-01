package ua.nure.cache.java.constants;

public class DBQueries {


	public static final String FIND_ALL_PROJECT_OBJ = "SELECT object.object_id,object.objectName,attribute.attr_id,"
			+ "attribute.Name "
			+ "FROM object "
			+ "left JOIN  "
			+ "attribute on attribute.object_id = object.object_id "
			+ "where project_id = ? ";

	public static final String FIND_STATISTICS_PROJ = "SELECT statistic.statistic_id ,statistic.name, "
			+ "object.objectName, attribute.attr_id,attribute.Name, object.object_id  "
			+ "from statistic "
			+ "left JOIN stattoattr ON stattoattr.statistic_id = statistic.statistic_id  "
			+ "left JOIN attribute ON stattoattr.attr_id = attribute.attr_id  "
			+ "left JOIN object ON attribute.object_id = object.object_id "
			+ "WHERE statistic.project_id =? "
			+ "ORDER BY statistic.statistic_id;";

	public static final String FIND_REPORT_PROJ = "SELECT report.report_id ,report.name, object.object_id,object.objectName, attribute.attr_id,attribute.Name  "
			+ "from report  "
			+ "left JOIN reporttoattr ON report.report_id = reporttoattr.report_id "
			+ "left JOIN attribute ON reporttoattr.attr_id = attribute.attr_id  "
			+ "left JOIN object ON attribute.object_id = object.object_id  "
			+ "WHERE report.project_id =? ORDER BY report.report_id;";

	public static final String FIND_DIAGRAM_BY_TYPE_PROJ = "Select JSON, diagram_id From diagram where project_id=? AND Type = ?";

	public static final String FIND_SEARCH_BY_PROJ_ID = "SELECT search.search_id,object.object_id, "
			+ "objectName, attribute.attr_id,attribute.Name FROM search "
			+ "left JOIN object on object.object_id = search.object_id  "
			+ "left join searchtoattr on searchtoattr.search_id = search.search_id "
			+ "left join attribute on searchtoattr.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ?  ORDER BY search_id, object.object_id;";

	public static final String FIND_SORTS_BY_PROJ_ID = "SELECT sort.sort_id,object.object_id, "
			+ "objectName,attribute.attr_id,attribute.Name FROM sort "
			+ "left JOIN object on object.object_id = sort.object_id  "
			+ "left join sorttoattr on sorttoattr.sort_id = sort.sort_id "
			+ "left join attribute on sorttoattr.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ? ORDER BY sort_id, object.object_id;";

	public static final String FIND_FILTERS_BY_PROJ_ID = "SELECT filter.filter_id,object.object_id, "
			+ "objectName,attribute.attr_id,attribute.Name FROM filter     "
			+ "left JOIN object on object.object_id = filter.object_id   "
			+ "left join filtertoattribute on filtertoattribute.filter_id = filter.filter_id  "
			+ "left join attribute on filtertoattribute.attribute_id = attribute.attr_id "
			+ "WHERE object.project_id = ?  ORDER BY filter_id, object.object_id;";

	public static final String FIND_ALG_DEPS_AND_RES_FIELD = "SELECT algdeps.dep_id, algdeps.formula, "
			+ "algdeps.result_field,algdeps.name,  "
			+ "object.objectName, object.object_id,attribute.Name  "
			+ "From algdeps "
			+ "left join attribute on attribute.attr_id = algdeps.result_field "
			+ "left join object on attribute.object_id = object.object_id "
			+ "WHERE algdeps.project_id = ?";

	public static final String FIND_SOURCE_FIELDS = " select algdeps.dep_id, sourcefield.varName, "
			+ "object.object_id,object.objectName,attribute.attr_id,attribute.Name  "
			+ "FROM algdeps   "
			+ "left join depstosourfield on algdeps.dep_id = depstosourfield.dep_id  "
			+ "left join sourcefield on depstosourfield.field_id = sourcefield.field_id  "
			+ "left join attribute on sourcefield.attr_id = attribute.attr_id "
			+ "left join object on attribute.object_id = object.object_id  "
			+ "WHERE object.project_id = ?   ORDER BY dep_id";

	public static final String GET_OBJ_BY_ID = "SELECT object.object_id, objectName, "
			+ "attribute.attr_id, attribute.Name FROM my_db.object "
			+ "left join attribute on attribute.object_id = object.object_id  "
			+ "WHERE object.object_id = ? AND project_id = ?;";
	
	public static final String INSERT_OBJECT ="INSERT INTO `my_db`.`object` "
			+ "(`project_id`,`objectName`) "
			+ "VALUES (?,?);";
	
	public static final String INSERT_ATTRIBUTE = "INSERT INTO `my_db`.`attribute` "
			+ "(`object_id`,`Name`) "
			+ "VALUES (?,?) ";
	
	public static final String INSERT_STATISTIC = "INSERT INTO `my_db`.`statistic` "
			+ "(`project_id`,`name`) "
			+ "VALUES (?,?);";
	
	public static final String INSERT_STAT_TO_ATTR = "INSERT INTO `my_db`.`stattoattr` (`statistic_id`, `attr_id`) VALUES (?,?);";

	public static final String INSERT_REPORT = "INSERT INTO `my_db`.`report` ( `project_id`, `name`) VALUES (?,?);";

	public static final String INSERT_REP_TO_OBJ = "INSERT INTO `my_db`.`reporttoattr` (`report_id`, `attr_id`) VALUES (?,?);";
	
	public static final String INSERT_DIAGRAM = "INSERT INTO `my_db`.`diagram`(`project_id`,`Type`,`JSON`) VALUES (?,?,?);";
	
	public static final String INSERT_FILTER ="INSERT INTO `my_db`.`filter`(`filter_id`,`object_id`) VALUES (?,?);";
	
	public static final String FILTER_TO_ATTR = "INSERT INTO filtertoattribute VALUES (?,?)";
	
	public static final String INSERT_SEARCH ="INSERT INTO `my_db`.`search`(`search_id`,`object_id`) VALUES (?,?);";
	
	public static final String SEARCH_TO_ATTR = "INSERT INTO searchtoattr VALUES (?,?);";
	
	public static final String INSERT_SORT ="INSERT INTO `my_db`.`sort`(`sort_id`,`object_id`) VALUES (?,?);";

	public static final String SORT_TO_ATTR = "INSERT INTO sorttoattr VALUES (?,?);";
	
	
	public static final String INSERT_ALG_DEPS ="INSERT INTO `my_db`.`algdeps` (`project_id`, `result_field`, `formula`, `name`) VALUES (?,?,?,?);";
	
	public static final String INSERT_SOURCE_FIELD ="INSERT INTO sourcefield (`varName`,`attr_id`) Values(?,?);";
	
	public static final String INSERT_DEP_TO_SF ="INSERT INTO depstosourfield (`dep_id`,`field_id`) VALUES (?,?);  ";
	
	
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
	
	public static final String UPDATE_SF ="UPDATE `my_db`.`sourcefield` SET `varName`=?, `attr_id`=? WHERE `field_id`=?;";
	
	
	public static final String INSERT_ATTR_CONSTR ="INSERT INTO `my_db`.`attrconstr` (`comment`, `attr_id`, `project_id`,`name`) VALUES (?, ?, ?,?);";
	
	public static final String GET_ATTR_CONSTR ="SELECT attrconstr.constr_id,attrconstr.comment,attrconstr.project_id, attrconstr.attr_id, "
			+ "attribute.name,object.object_id,object.objectName, attrconstr.name "
			+ "FROM attrconstr "
			+ "left join attribute on attrconstr.attr_id = attribute.attr_id "
			+ "left join object on attribute.object_id = object.object_id "
			+ "where attrconstr.project_id = ?";
	
	public static final String UPDATE_ATTR_CONSTR ="UPDATE `my_db`.`attrconstr` SET `comment`=?, `attr_id`=?, name=? WHERE `constr_id`=?;";
	
	public static final String DELETE_ATTR_CONSTR ="DELETE FROM `my_db`.`attrconstr` WHERE `constr_id`=?;";
	
	
	public static final String INSERT_LINK_CONSTR ="INSERT INTO `my_db`.`linkconstr` (`project_id`, `firstObject`, `secondObject`, `comment`,'name') VALUES (?,?,?,?,?);";
	
	public static final String GET_LINK_CONSTR ="select constr_id, linkconstr.project_id,comment, o1.object_id,o1.objectName,o2.object_id,o2.objectName,linkconstr.name  "
			+ "from linkconstr, object o1, object o2 "
			+ "where o1.object_id = firstObject and o2.object_id = secondObject "
			+ "AND o1.project_id = ? AND o2.project_id = ?";
	
	public static final String UPDATE_LINK_CONSTR ="UPDATE `my_db`.`linkconstr` SET `firstObject`=?, `secondObject`=?, `comment`=?, 'name' =? WHERE `constr_id`=?;";
	
	public static final String DELETE_LINK_CONSTR ="DELETE FROM `my_db`.`linkconstr` WHERE `constr_id`=?;";
	
	
	public static final String INSERT_ACTOR ="INSERT INTO `my_db`.`actors` (`actor_name`, `project_id`) VALUES (?, ?);";
	
	public static final String DELETE_ACTOR = "DELETE FROM `my_db`.`actors` WHERE `actor_id`=?;";
	
	public static final String UPDATE_ACTOR = "UPDATE `my_db`.`actors` SET `actor_name`=?, `project_id`=? WHERE `actor_id`=?;";
	
	public static final String GET_ACTOR = "SELECT * FROM my_db.actors WHERE project_id =?;";
	
	
	
	public static final String INSERT_LINK ="INSERT INTO `my_db`.`link` "
			+ "(`firstObj`, `secondObj`, `linkType`, `comment`, `project_id`) "
			+ "VALUES (?,?,?,?);";
	
	public static final String DELETE_LINK = "DELETE FROM `my_db`.`link` WHERE `link_id`=?;";
	
	public static final String UPDATE_LINK = "UPDATE `my_db`.`link` SET `firstObj`=?, `secondObj`=?, `linkType`=?, "
			+ "`comment`=?, `project_id`=? WHERE `link_id`=?;";
	
	public static final String GET_LINK = "SELECT link_id, o1.objectName, o2.objectName, linkType,comment,  "
			+ "link.project_id From link "
			+ "left join object o1 on firstObj = o1.object_id "
			+ "left join object o2 on secondObj = o2.object_id "
			+ "Where link.project_id =?";
}
