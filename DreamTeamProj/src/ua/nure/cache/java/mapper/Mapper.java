package ua.nure.cache.java.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ua.nure.cache.java.entity.AddObj;
import ua.nure.cache.java.entity.AlgDeps;
import ua.nure.cache.java.entity.Attribute;
import ua.nure.cache.java.entity.Objekt;
import ua.nure.cache.java.entity.Report;
import ua.nure.cache.java.entity.SourceField;
import ua.nure.cache.java.entity.SrchFltSrt;
import ua.nure.cache.java.entity.Statistic;

public class Mapper {

	public static List<Objekt> unmapProjObj(ResultSet rs) throws SQLException {
		List<Objekt> obj = new ArrayList<Objekt>();
		while (rs.next()) {
			Objekt objekt = new Objekt();
			objekt.setId(rs.getInt(1));
			objekt.setName(rs.getString(2));
			Attribute attr = new Attribute();
			attr.setId(rs.getInt(3));
			attr.setName(rs.getString(4));
			if (objekt.getId() == 0) {
				continue;
			}

			if (obj.contains(objekt) && attr.getId() != 0) {
				obj.get(obj.lastIndexOf(objekt)).getAttrs().add(attr);
			} else {
				if (attr.getId() != 0) {
					objekt.getAttrs().add(attr);
				}
				obj.add(objekt);
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
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			objekt.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));

			if (statLst.contains(stat)) {
				Statistic stItem = statLst.get(statLst.lastIndexOf(stat));
				if (stItem.getObjects().contains(objekt)) {
					if (attr.getId() != 0) {
						stItem.getObjects()
								.get(stItem.getObjects().lastIndexOf(objekt))
								.getAttrs().add(attr);
						statLst.set(statLst.lastIndexOf(stat), stItem);
					}
				} else {
					if (attr.getId() != 0) {
						objekt.getAttrs().add(attr);
					}
					if (objekt.getName() != null) {
						stItem.getObjects().add(objekt);
					}
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
			} else {
				if (attr.getId() != 0) {
					objekt.getAttrs().add(attr);
				}
				if (objekt.getName() != null) {
					stat.getObjects().add(objekt);
				}
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
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			objekt.setId(rs.getInt(3));
			objekt.setName(rs.getString(4));
			attr.setId(rs.getInt(5));
			attr.setName(rs.getString(6));

			if (statLst.contains(stat)) {
				Report stItem = statLst.get(statLst.lastIndexOf(stat));
				if (stItem.getObjects().contains(objekt)) {
					if (attr.getId() != 0) {
						stItem.getObjects()
								.get(stItem.getObjects().lastIndexOf(objekt))
								.getAttrs().add(attr);
					}
					statLst.set(statLst.lastIndexOf(stat), stItem);
				} else {
					if (attr.getId() != 0) {
						objekt.getAttrs().add(attr);
					}
					if (objekt.getName() != null) {
						stItem.getObjects().add(objekt);
					}
					statLst.set(statLst.lastIndexOf(stat), stItem);
				}
			} else {
				if (attr.getId() != 0) {
					objekt.getAttrs().add(attr);
				}
				if (objekt.getName() != null) {
					stat.getObjects().add(objekt);
				}
				statLst.add(stat);
			}
		}
		return statLst;
	}

	public static List<SrchFltSrt> unmapSrchFltSrt(ResultSet rs)
			throws SQLException {
		List<SrchFltSrt> statLst = new ArrayList<SrchFltSrt>();
		while (rs.next()) {
			SrchFltSrt o = new SrchFltSrt();
			Objekt objekt = new Objekt();
			Attribute attr = new Attribute();
			o.setId(rs.getInt(1));
			objekt.setId(rs.getInt(2));
			objekt.setName(rs.getString(3));
			attr.setId(rs.getInt(4));
			attr.setName(rs.getString(5));
			if (attr.getId() != 0) {
				objekt.getAttrs().add(attr);
			}
			if (objekt.getName() != null) {
				o.setObject(objekt);
			}
			statLst.add(o);
		}
		return statLst;
	}

	public static List<AlgDeps> unmapResourceField(ResultSet rs1)
			throws SQLException {
		List<AlgDeps> algDeps = new ArrayList<AlgDeps>();
		while (rs1.next()) {
			AlgDeps alg = new AlgDeps();
			AddObj obj = new AddObj();
			Attribute attr = new Attribute();
			alg.setId(rs1.getInt(1));
			alg.setFormula(rs1.getString(2));
			obj.setId(rs1.getInt(3));
			obj.setName(rs1.getString(4));
			attr.setId(rs1.getInt(5));
			attr.setName(rs1.getString(6));
			if (algDeps.contains(alg)) {
				if (attr.getId() != 0) {
					algDeps.get(algDeps.lastIndexOf(alg)).getResultField()
							.setAttr(attr);
				}
			} else {
				if (attr.getId() != 0) {
					obj.setAttr(attr);
				}
				if (obj.getName() != null) {
					alg.setResultField(obj);
				}
				algDeps.add(alg);
			}
		}
		
		return algDeps;
	}

	public static List<AlgDeps> unmapSourceFields(ResultSet rs2,
			List<AlgDeps> proj) throws SQLException {
		while (rs2.next()) {
			AlgDeps alg = new AlgDeps();
			AddObj obj = new AddObj();
			Attribute attr = new Attribute();
			SourceField sf = new SourceField();

			alg.setId(rs2.getInt(1));
			sf.setVariable(rs2.getString(2));
			obj.setId(rs2.getInt(3));
			obj.setName(rs2.getString(4));
			attr.setId(rs2.getInt(5));
			attr.setName(rs2.getString(6));

			if (proj.contains(alg)) {
				if (proj.get(proj.lastIndexOf(alg)).getSourceFields()
						.contains(sf)) {
					SourceField temp = proj
							.get(proj.lastIndexOf(alg))
							.getSourceFields()
							.get(proj.get(proj.lastIndexOf(alg))
									.getSourceFields().lastIndexOf(sf));
					if (attr.getId() != 0) {
						temp.getObject().setAttr(attr);
					}
					proj.get(proj.lastIndexOf(alg))
							.getSourceFields()
							.set(proj.get(proj.lastIndexOf(alg))
									.getSourceFields().lastIndexOf(sf), temp);
				} else {
					if (attr.getId() != 0) {
						obj.setAttr(attr);
					}
					if (obj.getName() != null) {
						sf.setObject(obj);
						proj.get(proj.lastIndexOf(alg)).getSourceFields()
								.add(sf);
					}
				}
			}
		}
		System.out.println("here");
		return proj;
	}

	public static Objekt unmapObj(ResultSet rs) throws SQLException {
		Objekt obj = new Objekt();
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

}
