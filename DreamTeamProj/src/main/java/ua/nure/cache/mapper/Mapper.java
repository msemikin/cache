package ua.nure.cache.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.entity.*;

public class Mapper {

	public static List<Entity> unmapProjObj(ResultSet rs) throws SQLException {
		List<Entity> obj = new ArrayList<Entity>();
		while (rs.next()) {
			Entity entity = new Entity();
			entity.setId(rs.getInt(1));
			entity.setName(rs.getString(2));
			Attribute attr = new Attribute();
			attr.setId(rs.getInt(3));
			attr.setName(rs.getString(4));
			if (entity.getId() == 0) {
				continue;
			}

			if (obj.contains(entity) && attr.getId() != 0) {
				obj.get(obj.lastIndexOf(entity)).getAttrs().add(attr);
			} else {
				if (attr.getId() != 0) {
					entity.getAttrs().add(attr);
				}
				obj.add(entity);
			}
		}
		return obj;
	}

	public static List<Statistic> unmapProjStat(ResultSet rs)
			throws SQLException {
		List<Statistic> statLst = new ArrayList<Statistic>();
		while (rs.next()) {
			Statistic stat = new Statistic();
			stat.setId(rs.getInt(1));
			stat.setName(rs.getString(2));
			Entity entity = new Entity();
			Attribute attr = new Attribute();
			entity.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			entity.setId(rs.getInt(6));
			if (statLst.contains(stat)) {
				Statistic stItem = statLst.get(statLst.lastIndexOf(stat));
//				if (stItem.getObjects().contains(entity)) {
//					if (attr.getId() != 0) {
//						stItem.getObjects()
//								.get(stItem.getObjects().lastIndexOf(entity))
//								.getAttrs().add(attr);
//						statLst.set(statLst.lastIndexOf(stat), stItem);
//					}
//				} else {
//					if (attr.getId() != 0) {
//						entity.getAttrs().add(attr);
//					}
//					if (entity.getName() != null) {
////						stItem.getObjects().add(entity);
//					}
//					statLst.set(statLst.lastIndexOf(stat), stItem);
//				}
			} else {
				if (attr.getId() != 0) {
					entity.getAttrs().add(attr);
				}
//				if (entity.getName() != null) {
//					stat.getObjects().add(entity);
//				}
				statLst.add(stat);
			}
		}
		return statLst;
	}

	public static List<Report> unmapReportProj(ResultSet rs)
			throws SQLException {
		List<Report> statLst = new ArrayList<Report>();
		while (rs.next()) {
			Report stat = new Report();
			stat.setId(rs.getInt(1));
			stat.setName(rs.getString(2));
			Entity entity = new Entity();
			Attribute attr = new Attribute();
			entity.setId(rs.getInt(3));
			entity.setName(rs.getString(4));
			attr.setId(rs.getInt(5));
			attr.setName(rs.getString(6));

			if (statLst.contains(stat)) {
				Report stItem = statLst.get(statLst.lastIndexOf(stat));
				if (stItem.getEntities().contains(entity)) {
					if (attr.getId() != 0) {
//						stItem.getEntities()
//								.get(stItem.getEntities().lastIndexOf(entity))
//								.getAttrs().add(attr);
					}
					statLst.set(statLst.lastIndexOf(stat), stItem);
				} else {
					if (attr.getId() != 0) {
						entity.getAttrs().add(attr);
					}
					if (entity.getName() != null) {
						stItem.getEntities().add(entity);
					}
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
			} else {
				if (attr.getId() != 0) {
					entity.getAttrs().add(attr);
				}
				if (entity.getName() != null) {
					stat.getEntities().add(entity);
				}
				statLst.add(stat);
			}
		}
		return statLst;
	}

	public static List<InformationalRequirement> unmapSrchFltSrt(ResultSet rs)
			throws SQLException {
		List<InformationalRequirement> statLst = new ArrayList<InformationalRequirement>();
		while (rs.next()) {
			InformationalRequirement o = new InformationalRequirement();
			Entity entity = new Entity();
			Attribute attr = new Attribute();
			o.setId(rs.getInt(1));
			entity.setId(rs.getInt(2));
			entity.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			if (attr.getId() != 0) {
				entity.getAttrs().add(attr);
			}
			if (entity.getName() != null) {
//				o.setObject(entity);
			}
			statLst.add(o);
		}
		return statLst;
	}

	public static List<AlgDep> unmapResourceField(ResultSet rs1)
			throws SQLException {
//		List<AlgDep> algDeps = new ArrayList<AlgDep>();
//		while (rs1.next()) {
//			AlgDep alg = new AlgDep();
//			AddEntity obj = new AddEntity();
//			Attribute attr = new Attribute();
//			alg.setId(rs1.getInt(1));
//			alg.setFormula(rs1.getString(2));
//			attr.setId(rs1.getInt(3));
//			alg.setName(rs1.getString(4));
//			obj.setName(rs1.getString(5));
//			obj.setId(rs1.getInt(6));
//			attr.setName(rs1.getString(7));
//			if (algDeps.contains(alg)) {
//				if (attr.getId() != 0) {
//					algDeps.get(algDeps.lastIndexOf(alg)).getResultField()
//							.setAttr(attr);
//				}
//			} else {
//				if (attr.getId() != 0) {
//					obj.setAttr(attr);
//				}
//				if (obj.getName() != null) {
//					alg.setResultField(obj);
//				}
//				algDeps.add(alg);
//			}
//		}
//
//		return algDeps;
		return null;
	}

	public static List<AlgDep> unmapSourceFields(ResultSet rs2,
												 List<AlgDep> proj) throws SQLException {
//		while (rs2.next()) {
//			AlgDep alg = new AlgDep();
//			AddEntity obj = new AddEntity();
//			Attribute attr = new Attribute();
//			SourceField sf = new SourceField();
//
//			alg.setId(rs2.getInt(1));
//			sf.setVariable(rs2.getString(2));
//			obj.setId(rs2.getInt(3));
//			obj.setName(rs2.getString(4));
//			attr.setId(rs2.getInt(5));
//			attr.setName(rs2.getString(6));
//
//			if (proj.contains(alg)) {
//				if (proj.get(proj.lastIndexOf(alg)).getSourceFields()
//						.contains(sf)) {
//					SourceField temp = proj
//							.get(proj.lastIndexOf(alg))
//							.getSourceFields()
//							.get(proj.get(proj.lastIndexOf(alg))
//									.getSourceFields().lastIndexOf(sf));
//					if (attr.getId() != 0) {
//						temp.getAttribute().setAttr(attr);
//					}
//					proj.get(proj.lastIndexOf(alg))
//							.getSourceFields()
//							.set(proj.get(proj.lastIndexOf(alg))
//									.getSourceFields().lastIndexOf(sf), temp);
//				} else {
//					if (attr.getId() != 0) {
//						obj.setAttr(attr);
//					}
//					if (obj.getName() != null) {
//						sf.setObject(obj);
//						proj.get(proj.lastIndexOf(alg)).getSourceFields()
//								.add(sf);
//					}
//				}
//			}
//		}
//		System.out.println("here");
//		return proj;
		return null;
	}

	public static Entity unmapObj(ResultSet rs) throws SQLException {
		Entity obj = new Entity();
		while (rs.next()) {
			obj.setId(rs.getInt(1));
			obj.setName(rs.getString(2));
			Attribute attr = new Attribute();
			attr.setId(rs.getInt(3));
			attr.setName(rs.getString(4));
			if (attr.getId() != 0) {
				obj.getAttrs().add(attr);
			}
		}
		return obj;
	}
	
	public static User unmapStudent(ResultSet rs) throws SQLException {
		User user = new User();
		while(rs.next()) {
			user.setId(rs.getInt(1));
			user.setFullname(rs.getString(2));
			user.setEmail(rs.getString(3));
		}
		return user;
	}

}
